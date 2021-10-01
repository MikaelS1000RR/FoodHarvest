import fetch from 'node-fetch'
import { Scrubber } from './Scrubber.js'
import { WillysHarvester } from '../Harvesters/WillysHarvester.js'
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Store } from '../Models/Store.js'
import { Preference } from "../Models/Preference.js"
import { Discount } from '../Models/Discount.js';
import { MathemHarvester } from '../Harvesters/MathemHarvester.js';
import { Category } from '../Models/Category.js';

export class MathemScrubber extends Scrubber {

  static translateSchema = {
    productCode: (x) => x.id,
    productName: (x) => x.name,
    price: (x) => x.price,
    quantity: (x) => x.quantity, //300g

    // quantityUnit: (x) => + x.unit,
    quantityUnit: (x) => this.setQuantityUnit(x.unit),
    comparisonUnit: (x) => x.comparePriceUnit, //kg
    comparisonPrice: (x) => x.comparePrice, //86.9 kr
    brand: (x) => x.brand.name,
    imageUrl: (x) => x.images.ORIGINAL,
    // category: (x) => this.setCategory(x.category.name),
    category: (x) => x.category.name, //This is gonna be a list??
    preferences: (x) => this.setPreferences(x.preferences),
    //ean: (x) => this.getEan(x.code),
    store: (x) => this.getStore(),
    //discount: (x) =>this.setDiscount(x.code)
  };

  static async getInformationFromDb() {
    const mathemFromDb = await FirebaseHandler.getStore("Mathem");
    // const mathemFromDb = this.getStore();//Must be changed later
    // console.log(mathemFromDb, "mathemFromDb")
    const preferencesFromDb = await FirebaseHandler.getPreferences();
    // console.log(preferencesFromDb, "preferencesFromDb")
    this.storeFromDb = mathemFromDb;
    this.preferencesFromDb = preferencesFromDb;
  }

  static async setPreferences(preferencesToBeScrubbed) {
    console.log(preferencesToBeScrubbed, "preferencesToBeScrubbed")
    const thePreferencesFromDb = this.preferencesFromDb;
    // console.log(thePreferencesFromDb, "TPFD")
    let scrubbedPreferences = [];
    //console.log(pref.name, "forEachtest")
    if (preferencesToBeScrubbed.dietary.length == 0
      && preferencesToBeScrubbed.labels.length == 0) { return null; }
    
    if (preferencesToBeScrubbed.labels.length > 0) {
      preferencesToBeScrubbed.labels.forEach(pref => {
        // console.log(pref)
        
        //Is under badges----------------------------------------NOT WORKING
        if (pref.name == "Fairtrade") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Fairtrade"
          )
          scrubbedPreferences.push(scrubbedPreference);
        }
        //-------------------------------------------------
        

      //   if (preferencesToBeScrubbed[i].labels == "Vegansk") {
      //   let scrubbedPreference = thePreferencesFromDb.find(
      //     (preference) => preference.name == "Veganskt"
      //   )
      //   scrubbedPreferences.push(scrubbedPreference);

      // }
        if (pref.name == "Svenskt ursprung") {
          console.log("Svenskt ursprung hittades")
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Svensk Flagga"
          )
          scrubbedPreferences.push(scrubbedPreference);
        }

        // console.log(scrubbedPreferences,"scrubbedPreferences")
      })
    }
    if (preferencesToBeScrubbed.dietary.length > 0) {
      preferencesToBeScrubbed.dietary.forEach(pref => {

        if (pref.name == "Laktosfri") {
          console.log("Laktosfri")
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Laktosfritt"
          )
          scrubbedPreferences.push(scrubbedPreference);
        }

        if (pref.name == "Glutenfri") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Glutenfritt"
          )
          scrubbedPreferences.push(scrubbedPreference);
        }


      })
    }

    // console.log(scrubbedPreference, "scrubbedPreference")
    

    // // if (preferencesToBeScrubbed.labels == "undefined" || preferencesToBeScrubbed.labels.length == 0) {
    // //   return null;
    // // }
    
    // // console.log(this.preferencesToBeScrubbed.labels.name, "preferencesToBeScrubbed.labels.name")
    // for (let i = 0; i < preferencesToBeScrubbed.length; i++) {
    //   if (preferencesToBeScrubbed[i].labels == "Fairtrade") {
    //     let scrubbedPreference = thePreferencesFromDb.find(
    //       (preference) => preference.name == "Fairtrade"
    //     )
    //     scrubbedPreferences.push(scrubbedPreference);
    //   }
    //   if (preferencesToBeScrubbed[i] == "Laktosfri") {
    //     let scrubbedPreference = thePreferencesFromDb.find(
    //       (preference) => preference.name == "Laktosfritt"
    //     )
    //     scrubbedPreferences.push(scrubbedPreference);
    //   }
    //   if (preferencesToBeScrubbed[i].labels == "Glutenfritt") {
    //     let scrubbedPreference = thePreferencesFromDb.find(
    //       (preference) => preference.name == "Glutenfritt"
    //     )
    //     scrubbedPreferences.push(scrubbedPreference);
    //   }
    //   if (preferencesToBeScrubbed[i].labels == "Veganskt") {
    //     let scrubbedPreference = thePreferencesFromDb.find(
    //       (preference) => preference.name == "Veganskt"
    //     )
    //     scrubbedPreferences.push(scrubbedPreference);

    //   }
    //   if (preferencesToBeScrubbed[i].labels.includes("Svenskt ursprung")) {
    //     console.log("Den hittade svenskt ursprung")
    //     let scrubbedPreference = thePreferencesFromDb.find(
    //       (preference) => preference.name == "Svensk Flagga"
    //     )
    //     scrubbedPreferences.push(scrubbedPreference);
    //   }
    //   // if (preferencesToBeScrubbed[i] == "Glutenfritt") {
    //   //   let scrubbedPreference = thePreferencesFromDb.find(
    //   //     (preference) => preference.name == "Glutenfritt"
    //   //   )
    //   //   scrubbedPreferences.push(scrubbedPreference);
    //   // }

    // }
    console.log(scrubbedPreferences,"scrubbedPreferences")
    return scrubbedPreferences;
  }


  static async setCategory(category) {
    // console.log(category, "category")
    // let result = Category.scrubCategories(category);
    // return result;
  }
  static async setQuantityUnit(quantity) {
    if (quantity.charAt(quantity.length - 2) === "k") {
      return "kg";
    } else {
      return "g";
    }
  }

  //Setting store as Mathem
  static async getStore() {
    const mathemStore = new Store(
      "Mathem",
      "https://cdn3.cdnme.se/4610179/9-3/2673452_5a8d99629606ee523a47e140.jpg"
    );
    return mathemStore;
  }
  // //Setting store as Mathem
  // static async getStore() {
  //   const mathemStore = new Store(
  //     "Mathem",
  //     "https://cdn3.cdnme.se/4610179/9-3/2673452_5a8d99629606ee523a47e140.jpg"
  //   );
  //   return mathemStore;
  // }

  // //Setting store as Mathem
  // static async getStore() {
  //   if (this.storeFromDb != undefined) {
  //     return this.storeFromDb
  //   } else {
  //     return null;
  //   }
  // }

  // static async setPreferences(preferences) {
  //   console.log(preferences, "prefrences")
  //   //If product has any references then scrub them
  //   if (preferences.length != 0) {
  //     let result = Preference.scrubPreferences(preferences);
  //     return result;
  //   }
  //   //If not, return null
  //   else {
  //     return null
  //   }
  // }

}