import fetch from "node-fetch";
import { FirebaseHandler } from "../FirebaseHandler";
import { Category } from "../Models/Category";

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
      "https://www.hemkop.se/c/" + categoryUrl + this.bustCache() + "&size=2200"
    );
    return (await raw.json()).results;
  }

  static async getAllProducts(hemkopCategories) {
    let hemkopProducts = [];
    let foodHarvesterCategories = await FirebaseHandler.getCategories();

    for (let i = 0; i < hemkopCategories.length; i++) {
      let hemkopCategory = hemkopCategories[i];
      let hemkopCategoryProducts = await this.getProductsByCategory(
        hemkopCategory.url
      );

      // continue to change each products category
    }
  }
}
