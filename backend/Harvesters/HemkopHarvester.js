import fetch from "node-fetch";
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Category } from "../Models/Category.js";
import { WillysHarvester } from "./WillysHarvester.js";

export class HemkopHarvester {
  static async getCategories() {
    let raw = await fetch(
      "https://www.hemkop.se/leftMenu/categorytree" + WillysHarvester.bustCache()
    );
    return await raw.json();
  }

  //Getting products in one specific category
  static async getProducts(categoryURL) {
    let raw = await fetch(
      "https://www.hemkop.se/c/" +
        categoryURL +
        WillysHarvester.bustCache() +
        "&size=10000"
    );
    return (await raw.json()).results;
  }

  static async getAllProducts(categories) {
    let allProductsOfHemkop = [];
    for (var i = 0; i < categories.length; i++) {
      let category = categories[i]; //Getting each category
      let productsOfCategory = await this.getProducts(category.url); //All products of the soecific cateogry

      allProductsOfHemkop.push(productsOfCategory);
    }
    console.log('harvesting all products from hemkop is done!');
    return allProductsOfHemkop
  }
}