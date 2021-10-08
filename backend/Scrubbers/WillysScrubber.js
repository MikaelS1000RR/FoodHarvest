import { Scrubber } from './Scrubber.js'
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Preference } from "../Models/Preference.js"

export class WillysScrubber extends Scrubber {
  static translateSchema = {
    productCode: (x) => x.code + "willys",
    productName: (x) => x.name,
    price: (x) => x.priceNoUnit,
    quantity: (x) => x.displayVolume,
    quantityUnit: (x) => this.setQuantityUnit(x.displayVolume),
    comparisonUnit: (x) => x.comparePriceUnit,
    comparisonPrice: (x) => x.comparePrice,
    brand: (x) => x.manufacturer,
    imageUrl: (x) => x.thumbnail.url,
    category: (x) => x.category.id, 
    preferences: (x) => this.setPreferenceIds(x.labels),
    store: (x) => this.getStore(),
  };
  static async setDBinfo() {
    const willysStore = await FirebaseHandler.getStore("Willys");
    const dbPreferences = await FirebaseHandler.getPreferences();
    this.store = willysStore;
    this.preferencesFromDB = dbPreferences;
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
    else {
      return null
    }
  }
}