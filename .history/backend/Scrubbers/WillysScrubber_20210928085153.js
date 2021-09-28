import fetch from 'node-fetch'
import { Scrubber } from './Scrubber.js'
import { WillysHarvester } from '../Harvesters/WillysHarvester.js'
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Store } from '../Models/Store.js'
import { Preference } from "../Models/Preference.js"
import { Discount } from '../Models/Discount.js';

export class WillysScrubber extends Scrubber {
  static translateSchema = {
    productName: (x) => x.name,
    price: (x) => x.priceNoUnit,
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
    discount: (x) =>
      new Discount(
       null,
        null,
        x.price,
        x.savingsAmount,
        Math.round((parseInt(x.savingsAmount) / parseInt(x.priceNoUnit)) * 100),
        false
      ),
  };

  static async setQuantityUnit(quantity) {
    if (quantity.charAt(quantity.length - 2) === "k") {
      return "kg";
    } else {
      return "g";
    }
  }


  //Getting ean for a product
  static async getEan(productCode) {

    
    let raw = await fetch(
      "https://www.willys.se/axfood/rest/p/" +
        productCode +
        WillysHarvester.bustCache()
    );
    let formatted = await raw.json();
    return formatted.ean;
  }

  //Setting store as Willys
  static async getStore() {
    const willysStore = new Store(
      "Willys",
      "https://digitalatjanster.se/wp-content/uploads/2020/04/willys-logo.png"
    );
    return willysStore;
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
}