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
    price: (x) => x.price,
    quantity: (x) => x.quantity, //300g

    // quantityUnit: (x) => + x.unit,
    quantityUnit: (x) => this.setQuantityUnit(x.unit),
    comparisonUnit: (x) => x.comparePriceUnit, //kg
    comparisonPrice: (x) => x.comparePrice, //86.9 kr
    brand: (x) => x.brand.name,
    imageUrl: (x) => x.images.ORIGINAL,
    // category: (x) => this.setCategory(x.category.name),
    category: (x) => this.setCategory(x.category.name),

    // category: (x) => x.category.name, //This is gonna be a list??
    preferences: (x) => this.setPreferences(x.preferences, x.name),
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
    let categoriesFromDb = await FirebaseHandler.getCategories();

    this.storeFromDb = mathemFromDb;
    this.preferencesFromDb = preferencesFromDb;
    this.categoriesFromDb = categoriesFromDb;
  }

  static async setCategory(categoryName) {
    let categoriesFromDb = this.categoriesFromDb;
    // console.log(categoriesFromDb.name, "categoriesFromDb")
    let result = categoryName;
    
    categoriesFromDb.forEach((category) => {
      if (category.name == categoryName) {
        // console.log(category.id, "categoriesFromDb")
        result = category.id;
      }
      
    })
    
    return result;
  }

  static async setPreferences(preferencesToBeScrubbed,productName) {
    // console.log(preferencesToBeScrubbed, "preferencesToBeScrubbed")
    // console.log(productName, "productName")
    const thePreferencesFromDb = this.preferencesFromDb;
    // console.log(thePreferencesFromDb, "TPFD")
    let scrubbedPreferences = [];
    //console.log(pref.name, "forEachtest")

    if (productName.includes("Vegetarisk")) {
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
        
        if (pref.name == "Svenskt ursprung") {
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

    return scrubbedPreferences;
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
    let storeFromDb = this.storeFromDb;
    return storeFromDb.id;
  }

}