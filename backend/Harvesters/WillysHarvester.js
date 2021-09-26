import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js';
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
  static async getProducts(categoryURL) {
    let raw = await fetch(
      "https://www.willys.se/c/" + categoryURL + this.bustCache() + "&size=2"
      //Max amount of items per category is 2124 (skafferi) so the max size will be 2200, ca 18k items in Willys
      //Dryck -1016
      //halsa-och-skonhet - 1077
      //skafferi - 2124
      //mejeri-ost-och-agg- 1125
    );
   
    return (await raw.json()).results;
  }

  static setCategory(categoryName) {
    let newCategory = new Category(categoryName);
    return newCategory;
  }

  //Getting all products from all categories
  static async getAllProducts(categories) {
    let allProductsOfWillys = [];
    let categoriesOfDb = await FirebaseHandler.getCategories();
   

    for (var i = 0; i < categories.length; i++) {
      let category = categories[i]; //Getting each category
      let productsOfCategory = await this.getProducts(category.url); //All products of the specific cateogry

  
      //Changing category of each product in a specific category
      for (let i = 0; i < productsOfCategory.length; i++){
       
       productsOfCategory[i].category=Category.scrubCategories(category.title, categoriesOfDb)
  
          allProductsOfWillys.push(productsOfCategory[i]);
       //productsOfCategory[i].category = category.url;
      }

      //Pushing products into one array
    
    }
    console.log('harvesting of willys is done!');
    return allProductsOfWillys;
  }

}
