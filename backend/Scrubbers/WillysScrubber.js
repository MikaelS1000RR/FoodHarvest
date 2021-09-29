import fetch from 'node-fetch'
import { Scrubber } from './Scrubber.js'
import { WillysHarvester } from '../Harvesters/WillysHarvester.js'
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Store } from '../Models/Store.js'
import { Preference } from "../Models/Preference.js"
import { Discount } from '../Models/Discount.js';

export class WillysScrubber extends Scrubber {
  static store = FirebaseHandler.getObjectByProperty("stores", "name", "Willys");

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
    //ean: (x) => this.getEan(x.code),
    store: (x) => this.getStore(),
    discount: (x) => this.getDiscount(x.potentialPromotions, x),
    //discount: (x) =>this.setDiscount(x.code)
  };

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
        false);
      return discount;
    }
    else {
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
    //If product has any references then scrub them
    if (preferences.length != 0) {
      let result = Preference.scrubPreferences(preferences, preferencesOfDb);
      return result;
    }
    //If not, return null
    else {
      return null;
    }
  }
}