import fetch from 'node-fetch'
import { Scrubber } from './Scrubber.js'
import { WillysHarvester } from '../Harvesters/WillysHarvester.js'
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Store } from '../Models/Store.js'
import { Preference } from "../Models/Preference.js"
import { Discount } from '../Models/Discount.js';
import { MathemHarvester } from '../Harvesters/MathemHarvester.js';

export class MathemScrubber extends Scrubber {
  
  static translateSchema = {
    productName: (x) => x.name,
    price: (x) => x.price,
    quantity: (x) => x.quantity, //300g

    quantityUnit: (x) => + x.unit,
    comparisonUnit: (x) => x.comparePriceUnit, //kg
    comparisonPrice: (x) => x.comparePrice, //86.9 kr
    brand: (x) => x.brand.name,
    imageUrl: (x) => x.images.ORIGINAL,

    category: (x) => x.category, //This is gonna be a list??
    preferences: (x) => this.setPreferences(x.preferences.labels),
    //ean: (x) => this.getEan(x.code),
    store: (x) => this.getStore(),
    //discount: (x) =>this.setDiscount(x.code)
  };
  

  //Setting store as Willys
  static async getStore() {
    const mathemStore = new Store(
      "Mathem",
      "https://cdn3.cdnme.se/4610179/9-3/2673452_5a8d99629606ee523a47e140.jpg"
    );
    return mathemStore;
  }

  static async setPreferences(preferences) {

    //If product has any references then scrub them
    if (preferences.length != 0) {
      let result = Preference.scrubPreferences(preferences);
      return result;
    }
    //If not, return null
    else {
      return null
    }
  }
  
}