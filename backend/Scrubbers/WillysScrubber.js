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
    category: (x) => x.category.id, //This is gonna be a list??
    preferences: (x) => this.setPreferenceIds(x.labels),
    store: (x) => this.getStore(),
    //ean: (x) => this.getEan(x.code),
    // discount: (x) => this.getDiscount(x.potentialPromotions, x),
    //discount: (x) =>this.setDiscount(x.code)
  };
  static async setDBinfo() {
    console.log("getting");
    const willysStore = await FirebaseHandler.getStore("Willys");
    const dbPreferences = await FirebaseHandler.getPreferences();
    console.log("Store set");
    this.store = willysStore;
    this.preferencesFromDB = dbPreferences;
    console.log("this store", this.store);
  }

  static getStore() {
    if (this.store != undefined) {
      return this.store.id;
    } else {
      return null;
    }
  }

  static async setQuantityUnit(quantity) {
    if (quantity.charAt(quantity.length - 2) === "k") {
      return "kg";
    } else {
      return "g";
    }
  }

  static async getDiscount(promotions, product) {
    if (promotions.length != 0) {
      let discount = new Discount(
        promotions[0].campaignType,
        promotions[0].qualifyingCount,
        product.price,
        product.savingsAmount,
        Math.round(
          (parseFloat(product.savingsAmount) /
            parseFloat(product.priceNoUnit)) *
            100
        ),
        false
      );
      return discount;
    } else {
      return null;
    }
  }

  static async setDiscount(productCode) {
    let type = null;
    let quantityToBeBought = null;
    let raw = await fetch(
      "https://www.willys.se/axfood/rest/p/" +
        productCode +
        WillysHarvester.bustCache()
    );
    let formatted = await raw.json();

    if (formatted.potentialPromotions.length != 0) {
      type = formatted.potentialPromotions[0].campaignType;
      quantityToBeBought = formatted.potentialPromotions[0].qualifyingCount;
    }
    let discount = new Discount(
      type,
      quantityToBeBought,
      formatted.price,
      formatted.savingsAmount,
      Math.round(
        (parseFloat(formatted.savingsAmount) /
          parseFloat(formatted.priceNoUnit)) *
          100
      ),
      false
    );

    return discount;
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

  //Setting preferences for a product
  static async setPreferenceIds(preferences) {
    //If product has any references then scrub them
    if (preferences.length != 0) {
      let preferenceIds = Preference.scrubPreferenceIds(
        preferences,
        this.preferencesFromDB
      );
      return preferenceIds;
    }
    //If not, return null
    else {
      return null;
    }
  }
}