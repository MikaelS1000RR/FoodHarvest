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
    productCode: (x) => x.id + " Mathem",
    productName: (x) => x.name,
    price: (x) => x.price + " kr",
    
    quantityUnit: (x) => x.unit,
    quantity: (x) => x.quantity + x.unit, //300g
    // quantityUnit: (x) => this.setQuantityUnit(x.unit),
    comparisonUnit: (x) => x.comparisonUnit, //kg
    comparisonPrice: (x) => x.comparisonPrice + " kr", //86.9 kr
    brand: (x) => x.brand.name,
    imageUrl: (x) => x.images.ORIGINAL,
    // category: (x) => this.setCategory(x.category.name),
    category: (x) => this.setCategory(x.category.name),

    // category: (x) => x.category.name, //This is gonna be a list??
    preferences: (x) => this.setPreferences(x.preferences, x.name, x.badges),
    //ean: (x) => this.getEan(x.code),
    store: (x) => this.getStore(),
    //discount: (x) =>this.setDiscount(x.code)
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
        console.log(badge, "badge")
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
        
        if (pref.name == "Svenskt ursprung" || pref.name == "Kött från Sverige") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Svensk Flagga"
          )
          console.log(scrubbedPreference, "scrubbedPreference")
          console.log(scrubbedPreference.id,"scrubbedPreference.id")
          scrubbedPreferences.push(scrubbedPreference.id);
        }

        if (pref.name == "Nyckelhålsmärkt") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Nyckelhålsmärkt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }

        if (pref.name == "Ekologisk") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "Ekologiskt"
          )
          scrubbedPreferences.push(scrubbedPreference.id);
        }

        if (pref.name == "Kravmärkt") {
          let scrubbedPreference = thePreferencesFromDb.find(
            (preference) => preference.name === "KRAV-märkt"
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