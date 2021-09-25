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
      "https://www.willys.se/c/" +
        categoryURL +
        this.bustCache() +
        "&size=10000"
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
      let productsOfCategory = await this.getProducts(category.url); //All products of the soecific cateogry

              let categoryFromDb=''
      //Changing category of each product in a specific category
      for (let i = 0; i < productsOfCategory.length; i++){
       
       
        if (category.url.includes("kott")) {
          productsOfCategory[i].category = this.setCategory("Kött, Fågel & Chark");
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
         
               productsOfCategory[i].category =
                 this.setCategory("Bröd & Bageri");
        }
         if (category.url.includes("fryst")) {
          
             productsOfCategory[i].category = this.setCategory("Övrigt");
        }
        if (category.url.includes("fisk")) {
          
          
             productsOfCategory[i].category =
               this.setCategory("Fisk & Skaldjur");
        }
        if (category.url.includes("vegetariskt")) {
       
          
             productsOfCategory[i].category =
               this.setCategory("Övrigt");
        }
        if (category.url.includes("glass")) {
         
           productsOfCategory[i].category = this.setCategory(
             "Glass, Godis & Snacks"
           );
        }
        if (category.url.includes("dryck")) {
        
          
           productsOfCategory[i].category = this.setCategory(
             "Dryck"
           );
        }
        if (category.url.includes("fardigmat")) {
         
           productsOfCategory[i].category = this.setCategory(
             "Färdigmat & Sallader"
           );
        }
        if (category.url.includes("barn")) {
          
           productsOfCategory[i].category = this.setCategory(
             "Barn"
           );
        }
        if (category.url.includes("blommor")) {
         
           productsOfCategory[i].category =
             this.setCategory("Blommor & Växter");
        }
        if (category.url.includes("hem")) {
          
          
           productsOfCategory[i].category = this.setCategory("Hem & Hushåll");
        }
        if (category.url.includes("halsa")) {
         
             productsOfCategory[i].category =
               this.setCategory("Skönhet & Hälsa");
        }
        if (category.url.includes("apotek")) {
         
           productsOfCategory[i].category = this.setCategory("Skönhet & Hälsa");
        }
        if (category.url.includes("husdjur")) {
        
           productsOfCategory[i].category = this.setCategory("Djur");
        }
        if (category.url.includes("tobak")) {
        
           productsOfCategory[i].category =
             this.setCategory("Kiosk & Tidningar");
        }
        if (category.url.includes("tandare")) {
           productsOfCategory[i].category =
             this.setCategory("Kiosk & Tidningar");
        }
        if (category.url.includes("lotter")) {
           productsOfCategory[i].category =
             this.setCategory("Kiosk & Tidningar");
        }

        
          allProductsOfWillys.push(productsOfCategory[i]);
       //productsOfCategory[i].category = category.url;
      }

      //Pushing products into one array
    
    }
    return allProductsOfWillys;
  }

}
