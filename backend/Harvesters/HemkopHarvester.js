import fetch from "node-fetch";
import { FirebaseHandler } from '../FirebaseHandler.js'

export class HemkopHarvester {
  static bustCache() {
    return "?avoidCache=" + (Math.random() + "").split(".")[1];
  }

  static async getCategories() {
    let raw = await fetch(
      "https://www.hemkop.se/leftMenu/categorytree" + this.bustCache()
    );
    return await raw.json();
  }

  static async getProductsByCategory(categoryUrl, size) {
    let raw = await fetch(
      "https://www.hemkop.se/c/" + categoryUrl + this.bustCache() + "&size=" + size
    );
    return (await raw.json()).results;
  }


  static async getAllProducts(hemkopCategories, size) {
    let hemkopProductsRefinedCat = [];
    let foodHarvesterCategories = await FirebaseHandler.getCategories();

    for (let i = 0; i < hemkopCategories.length; i++) {
      let hemkopCategory = hemkopCategories[i];
      let hemkopProducts = await this.getProductsByCategory(hemkopCategory.url, size);

      for (let i = 0; i < hemkopProducts.length; i++) {
        hemkopProducts[i].category = this.refineCategory(
          hemkopCategory.title,
          foodHarvesterCategories
        );
    
        hemkopProductsRefinedCat.push(hemkopProducts[i]);
      }
    }

  
    return hemkopProductsRefinedCat;
  }


  static refineCategory(storeCategoryName, dbCategories) {

    // Creating an array of single words for a Hemkop category
    let wordArr = storeCategoryName.split("&").join().split(",")
    let wordArr2 = [];
    for (let word of wordArr) {
      let wordCopy = word.trim()
      wordArr2.push(wordCopy)
    }
    
    let foundCategory = false; 

    for (let i = 0; i < dbCategories.length; i++) {
      for (let j = 0; j < wordArr2.length; j++) {

        //If db category name includes any word from Hemkop category, change Hemkop category to db category
        if (dbCategories[i].name.includes(wordArr2[j])) {
          foundCategory = true;
          return dbCategories[i];
        }
      }
    }

    if (!foundCategory) {
      return dbCategories.find((category) => category.name === "Övrigt");
    }
  }
}
