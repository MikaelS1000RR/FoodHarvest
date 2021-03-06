import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js'
import {Category} from "../Models/Category.js"

export class WillysHarvester {
  static bustCache() {
    return "?avoidCache=" + (Math.random() + "").split(".")[1];
  }

  //Getting all basic categories in Willys
  static async getCategories() {
    let raw = await fetch(
      "https://www.willys.se/leftMenu/categorytree" + this.bustCache()
    );
    return await raw.json();
  }

  //Getting products in one specific category
  static async getProducts(categoryURL, size) {
    let raw = await fetch(
      "https://www.willys.se/c/" + categoryURL + this.bustCache() + "&size=" + size
      //Max amount of items per category is 2124 (skafferi) so the max size will be 2200, ca 18k items in Willys
    );
   
    return (await raw.json()).results;
  }

  //Getting all products from all categories
  static async getAllProducts(categories, size) {

    let allProductsOfWillys = [];
    let categoriesOfDb = await FirebaseHandler.getCategories();

    for (var i = 0; i < categories.length; i++) {
      let category = categories[i]; //Getting each category
      let productsOfCategory = await this.getProducts(category.url, size); //All products of the specific cateogry

  
      //Changing category of each product in a specific category
      for (let i = 0; i < productsOfCategory.length; i++){
        productsOfCategory[i].category=Category.scrubCategories(category.title, categoriesOfDb)
        allProductsOfWillys.push(productsOfCategory[i]);
      }
    
    }
    return allProductsOfWillys;
  }

}
