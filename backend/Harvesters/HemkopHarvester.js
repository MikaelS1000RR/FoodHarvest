import fetch from "node-fetch";
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Category } from "../Models/Category.js";
import { WillysHarvester } from "./WillysHarvester.js";

export class HemkopHarvester {
  static async getCategories() {
    let raw = await fetch(
      "https://www.hemkop.se/leftMenu/categorytree" +
        WillysHarvester.bustCache()
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

  static setCategory(categoryName) {
    let newCategory = new Category(categoryName);
    return newCategory;
  }

  static async getAllProducts(categories) {
    let allProductsOfHemkop = [];
    for (var i = 0; i < categories.length; i++) {
      let category = categories[i]; //Getting each category
      let productsOfCategory = await this.getProducts(category.url); //All products of the specific cateogry

      for (let i = 0; i < productsOfCategory.length; i++) {
        if (category.url.includes("kott")) {
          productsOfCategory[i].category = this.setCategory(
            "Kött, Fågel & Chark"
          );
        }
        if (category.url.includes("chark")) {
          productsOfCategory[i].category = this.setCategory(
            "Kött, Fågel & Chark"
          );
        }
        if (category.url.includes("frukt")) {
          productsOfCategory[i].category = this.setCategory("Frukt & Grönt");
        }
        if (category.url.includes("mejeri")) {
          productsOfCategory[i].category =
            this.setCategory("Mejeri, Ost & Ägg");
        }
        if (category.url.includes("skafferi")) {
          productsOfCategory[i].category = this.setCategory("Skafferi");
        }
        if (category.url.includes("brod")) {
          productsOfCategory[i].category = this.setCategory("Bröd & Bageri");
        }
        if (category.url.includes("fryst")) {
          productsOfCategory[i].category = this.setCategory("Övrigt");
        }
        if (category.url.includes("fisk")) {
          productsOfCategory[i].category = this.setCategory("Fisk & Skaldjur");
        }
        if (category.url.includes("vegetariskt")) {
          productsOfCategory[i].category = this.setCategory("Övrigt");
        }
        if (category.url.includes("godis")) {
          productsOfCategory[i].category = this.setCategory(
            "Glass, Godis & Snacks"
          );
        }
        if (category.url.includes("dryck")) {
          productsOfCategory[i].category = this.setCategory("Dryck");
        }
        if (category.url.includes("fardigmat")) {
          productsOfCategory[i].category = this.setCategory(
            "Färdigmat & Sallader"
          );
        }
        if (category.url.includes("barn")) {
          productsOfCategory[i].category = this.setCategory("Barn");
        }
        if (category.url.includes("blommor")) {
          productsOfCategory[i].category = this.setCategory("Blommor & Växter");
        }
        if (category.url.includes("hem")) {
          productsOfCategory[i].category = this.setCategory("Hem & Hushåll");
        }
        if (category.url.includes("halsa")) {
          productsOfCategory[i].category = this.setCategory("Skönhet & Hälsa");
        }
        if (category.url.includes("apotek")) {
          productsOfCategory[i].category = this.setCategory("Skönhet & Hälsa");
        }
        if (category.url.includes("djur")) {
          productsOfCategory[i].category = this.setCategory("Djur");
        }
        if (category.url.includes("kiosk")) {
          productsOfCategory[i].category =
            this.setCategory("Kiosk & Tidningar");
        }
      }

      allProductsOfHemkop.push(productsOfCategory);
    }
    console.log("harvesting all products from hemkop is done!");
    return allProductsOfHemkop;
  }
}