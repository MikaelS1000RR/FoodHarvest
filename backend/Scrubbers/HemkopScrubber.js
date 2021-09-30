import { FirebaseHandler } from "../FirebaseHandler.js";
import { HemkopHarvester } from "../Harvesters/HemkopHarvester.js";
import { Scrubber } from "./Scrubber.js";

export class HemkopScrubber extends Scrubber {

  static translateSchema = {
    productCode: (x) => x.code,
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
    //ean: (x) => this.getEan(x.code),
    store: (x) => this.getStore(),
    //discount: (x) => this.getDiscount(x.potentialPromotions, x)
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
    console.log("Store set");
    this.storeFromDB = hemkopStore;
    this.preferencesFromDB = dbPreferences;
  }

  static getStore() {
    if (this.storeFromDB != undefined) {
      return this.storeFromDB;
    } else {
      return null;
    }
  }

  static async getPreferences(productPreferences) {
    const dbPreferences = this.preferencesFromDB;
    let refinedHemkopPreferences = [];

    console.log("productPreferences: ", productPreferences);

    if (productPreferences != undefined && productPreferences.length != 0) {
      for (let j = 0; j < productPreferences.length; j++) {
        if (productPreferences[j] === "swedish_flag") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Svensk Flagga"
          );
          refinedHemkopPreferences.push(newPref);
        }

        if (productPreferences[j] === "keyhole") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Nyckelhålsmärkt"
          );
          refinedHemkopPreferences.push(newPref);
        }

        if (productPreferences[j] === "krav") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "KRAV-märkt"
          );
          refinedHemkopPreferences.push(newPref);
        }
        if (productPreferences[j] === "ecological") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Ekologiskt"
          );
          refinedHemkopPreferences.push(newPref);
        }
        if (productPreferences[j] === "laktosfree") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Laktosfritt"
          );
          refinedHemkopPreferences.push(newPref);
        }
        if (productPreferences[j] === "fairtrade") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Fairtrade"
          );
          refinedHemkopPreferences.push(newPref);
        }
        if (productPreferences[j] === "glutenfree") {
          let newPref = dbPreferences.find(
            (preference) => preference.name === "Glutenfritt"
          );
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

  static async getEan(code) {
    let raw = await fetch(
      "https://www.hemkop.se/axfood/rest/p/" +
        code +
        HemkopHarvester.bustCache()
    );
    let formatted = await raw.json();
    return formatted.ean;
  }
}
