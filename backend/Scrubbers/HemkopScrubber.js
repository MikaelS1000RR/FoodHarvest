import { FirebaseHandler } from "../FirebaseHandler.js";
import { Scrubber } from "./Scrubber.js";

export class HemkopScrubber extends Scrubber {

  static translateSchema = {
    productCode: (x) => x.code + "hemkop",
    productName: (x) => x.name,
    price: (x) => x.priceNoUnit,
    quantity: (x) => x.displayVolume,
    quantityUnit: (x) => this.setQuantityUnit(x.displayVolume),
    comparisonUnit: (x) => x.comparePriceUnit,
    comparisonPrice: (x) => x.comparePrice,
    brand: (x) => x.manufacturer,
    imageUrl: (x) => x.thumbnail.url,
    category: (x) => x.category,
    preferences: (x) => this.getPreferences(x.labels),
    store: (x) => this.getStore(),
  };

  static async setQuantityUnit(quantity) {
    if (quantity.charAt(quantity.length - 2) === "k") {
      return "kg";
    } else {
      return "g";
    }
  }

  static async setDBinfo() {
    const hemkopStore = await FirebaseHandler.getStore("Hemköp");
    const dbPreferences = await FirebaseHandler.getPreferences();
    this.storeFromDB = hemkopStore;
    this.preferencesFromDB = dbPreferences;
  }

  static getStore() {
    if (this.storeFromDB != undefined) {
      return this.storeFromDB.id;
    } else {
      return null;
    }
  }

  static async getPreferences(productPreferences) {
    const dbPreferences = this.preferencesFromDB;
    let refinedHemkopPreferences = [];


    if (productPreferences != undefined && productPreferences.length != 0) {
      for (let j = 0; j < productPreferences.length; j++) {
        if (productPreferences[j] === "swedish_flag") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Svensk Flagga"
          ).id;
          refinedHemkopPreferences.push(newPref);
        }

        if (productPreferences[j] === "keyhole") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Nyckelhålsmärkt"
          ).id;
          refinedHemkopPreferences.push(newPref);
        }

        if (productPreferences[j] === "krav") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "KRAV-märkt"
          ).id;
          refinedHemkopPreferences.push(newPref);
        }
        if (productPreferences[j] === "ecological") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Ekologiskt"
          ).id;
          refinedHemkopPreferences.push(newPref);
        }
        if (productPreferences[j] === "laktosfree") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Laktosfritt"
          ).id;
          refinedHemkopPreferences.push(newPref);
        }
        if (productPreferences[j] === "fairtrade") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Fairtrade"
          ).id;
          refinedHemkopPreferences.push(newPref);
        }
        if (productPreferences[j] === "glutenfree") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Glutenfritt"
          ).id;
          refinedHemkopPreferences.push(newPref);
        }
      }
      if (refinedHemkopPreferences.length != 0) {
        return refinedHemkopPreferences;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
