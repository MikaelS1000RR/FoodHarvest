import { Scrubber } from './Scrubber.js'
import { FirebaseHandler } from "../FirebaseHandler.js";

export class MathemScrubber extends Scrubber {

  static translateSchema = {
    productCode: (x) => x.id + " Mathem",
    productName: (x) => x.name,
    price: (x) => x.price,
    quantityUnit: (x) => x.unit,
    quantity: (x) => x.quantity + x.unit,
    comparisonUnit: (x) => x.comparisonUnit, 
    comparisonPrice: (x) => x.comparisonPrice, 
    brand: (x) => x.brand.name,
    imageUrl: (x) => x.images.ORIGINAL,
    category: (x) => this.setCategory(x.category.name),
    preferences: (x) => this.setPreferences(x.preferences, x.name, x.badges),
    store: (x) => this.getStore(),
  };

  static async getInformationFromDb() {
    const mathemFromDb = await FirebaseHandler.getStore("Mathem");
    const preferencesFromDb = await FirebaseHandler.getPreferences();
    const categoriesFromDb = await FirebaseHandler.getCategories();

    this.storeFromDb = mathemFromDb;
    this.preferencesFromDb = preferencesFromDb;
    this.categoriesFromDb = categoriesFromDb;
  }

  static async setCategory(categoryName) {
    let categoriesFromDb = this.categoriesFromDb;
    let result = categoryName;

    categoriesFromDb.forEach((category) => {
      if (category.name == categoryName) {
        result = category.id;
      }
      
    })
    
    return result;
  }

  static async setPreferences(preferencesToBeScrubbed,productName, badges) {

    const thePreferencesFromDb = this.preferencesFromDb;
    let scrubbedPreferences = [];

    //badges
    if (badges.length > 0) {
      badges.forEach((badge) => {
        if (badge.toolTip.includes("vegetarianer") ||
          badge.toolTip.includes("Vegetarisk") ||
          badge.toolTip.includes("vegetarisk")) {
          
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Vegetariskt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }
        
      })
    } else if (productName.includes("Vegetarisk") || productName.includes("vegetarisk")) {
         let scrubbedPreference = thePreferencesFromDb.find(
           (preference) => preference.name === "Vegetariskt"
         )
         scrubbedPreferences.push(scrubbedPreference.id);
     }



    //If there is nothing to scrub return.
    if (preferencesToBeScrubbed.dietary.length == 0
      && preferencesToBeScrubbed.labels.length == 0) { return null; }
       
    //Sorts through lables
    if (preferencesToBeScrubbed.labels.length > 0) {
      preferencesToBeScrubbed.labels.forEach(pref => {
        
        if (pref.name == "Fairtrade") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Fairtrade"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }
        
        if (pref.name == "Svenskt ursprung" || pref.name == "K??tt fr??n Sverige") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Svensk Flagga"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }

        if (pref.name == "Nyckelh??lsm??rkt") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Nyckelh??lsm??rkt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }

        if (pref.name == "Ekologisk") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Ekologiskt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }

        if (pref.name == "Kravm??rkt") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "KRAV-m??rkt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }
      })
    }


    //Sorts through dietary
    if (preferencesToBeScrubbed.dietary.length > 0) {
      preferencesToBeScrubbed.dietary.forEach(pref => {

        if (pref.name == "Laktosfri") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Laktosfritt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }

        if (pref.name == "Glutenfri") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Glutenfritt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }

        if (pref.name == "Vegansk") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Veganskt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }

      })
    }
    if (scrubbedPreferences.length > 0) {
      return scrubbedPreferences;
    } else {
      return null;
    }
  }

  static async setQuantityUnit(quantity) {
    if (quantity.length == 2) {
      return "kg";
    } else {
      return "g";
    }
  }

  //Setting store as Mathem
  static async getStore() {
    let storeFromDb = this.storeFromDb;
    return storeFromDb.id;
  }

}