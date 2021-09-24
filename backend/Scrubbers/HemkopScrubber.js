import fetch from "node-fetch";
import { Scrubber } from "./Scrubber.js";
import { WillysHarvester } from "../Harvesters/WillysHarvester.js";
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Store } from "../Models/Store.js";
import { Preference } from "../Models/Preference.js";
import { Discount } from "../Models/Discount.js";


export class HemkopScrubber extends Scrubber {
  static translateSchema = {
    productName: (x) => x.name,
    price: (x) => x.priceValue,
    quantity: (x) => x.displayVolume, //300g

    quantityUnit: (x) => this.setQuantityUnit(x.displayVolume),
    comparisonUnit: (x) => x.comparePriceUnit, //kg
    comparisonPrice: (x) => x.comparePrice, //86.9 kr
    brand: (x) => x.manufacturer,
    imageUrl: (x) => x.thumbnail.url,

    category: (x) => x.category, //This is gonna be a list??
    preferences: (x) => this.setPreferences(x.labels),
    ean: (x) => this.getEan(x.code),
    store: (x) => this.getStore(),
    discount: (x) =>this.getDiscount(x.code)
     
  };


  static async getDiscount(productCode) {
   let type=null
    let raw = await fetch(
      "https://www.hemkop.se/axfood/rest/p/" +
        productCode +
        WillysHarvester.bustCache()
    );
    let formatted = await raw.json();
    if (formatted.potentialPromotions.length != 0) {
      
    type=formatted.potentialPromotions[0].campaignType
    }
    let discount = new Discount(
        
      type,
      formatted.price,
      formatted.savingsAmount,
      Math.round((parseInt(formatted.savingsAmount) / parseInt(formatted.priceNoUnit)) * 100),
      false
    );
     
    return discount
  }

  //Getting store
  static async getStore() {
    const hemkopStore = new Store(
      "Hemköp",
      "https://eo.se//wp-content/uploads/2017/10/Hemkop_654x261.png"
    );
    return hemkopStore;
  }


  //Setting quantity unit
  static async setQuantityUnit(quantity) {
    if (quantity.charAt(quantity.length - 2) === "k") {
      return "kg";
    } else {
      return "g";
    }
  }

  //Setting preferences for a product
  static async setPreferences(preferences) {
    let arrPreferences = [];
    for (let i = 0; i < preferences.length; i++) {
      let newPreference = new Preference(preferences[i]);
      arrPreferences.push(newPreference);
    }
    return arrPreferences;
  }

  //Getting ean for a product
  static async getEan(productCode) {
    let raw = await fetch(
      "https://www.hemkop.se/axfood/rest/p/" +
        productCode +
        WillysHarvester.bustCache()
    );
    let formatted = await raw.json();
    return formatted.ean;
  }
}