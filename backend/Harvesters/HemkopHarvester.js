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

  static async getProductsByCategory(categoryUrl) {
    let raw = await fetch(
      "https://www.hemkop.se/c/" + categoryUrl + this.bustCache() + "&size=2"
    );
    return (await raw.json()).results;
  }


  static async getAllProducts(hemkopCategories) {
    let hemkopProductsRefinedCat = [];
    let foodHarvesterCategories = await FirebaseHandler.getCategories();

    for (let i = 0; i < hemkopCategories.length; i++) {
      let hemkopCategory = hemkopCategories[i];
      let hemkopProducts = await this.getProductsByCategory(hemkopCategory.url);

      // for (let i = 0; i < hemkopProducts.length; i++)
      // *************temp looping 3 products in each category**************
      for (let i = 0; i < 3; i++) {
        hemkopProducts[i].category = this.refineCategory(
          hemkopCategory.title,
          foodHarvesterCategories
        );

        console.log("Hemkop category: ", hemkopCategory.title);
        hemkopProductsRefinedCat.push(hemkopProducts[i]);
      }
    }

    console.log("Hemkop has been harvested!");
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
        if (dbCategories[i].name.includes(wordArr2[j])) {
          foundCategory = true;
          return dbCategories[i].id;
        }
      }
    }

    if (!foundCategory) {
      return dbCategories.find((category) => category.name === "Övrigt").id;
    }
  }
}
