import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js'
import { Category } from '../Models/Category.js'

export class MathemHarvester {
    // static bustCache() {
    //     return "?avoidCache=" + (Math.random() + "").split(".")[1];
    // }

    static async getCategories() {
        let raw = await fetch(
            "https://api.mathem.io/ecom-navigation/noauth/category/16" 
        );
        return await raw.json();
    }

    static async getProducts(categoryURL) {
        // Create an empty array
        // Write for-loop to loop products in categories
        // Store products from categories in array 
        let raw = await fetch(
            "https://api.mathem.io/product-search/noauth/categorylist/" 
            + categoryURL + 
            "?storeId=16&productSizePerCategory=50&categorySize=20"
        );
        return await raw.json();
    }

    static async getProductsFromCategories(mCategories) {
        let productStorage = [];
        for(let i = 0; i < mCategories.length; i++) {
            let product = mCategories[i];
            let productOfCategory = product
        }
    }

    static setCategory(categoryName) {
        let newCategory = new Category(categoryName);
        return newCategory;
      }

      static async overWriteProducts(categories) {
        console.log('Harvesting has started');
        let allProductsOfMathem = [];
        let categoriesOfDb = await FirebaseHandler.getCategories();

        for (let i = 0; i < categories.length; i++) {
            let category = categories[i]; //Getting each category
            let productsOfCategory = await this.getProducts(category.url);

        // Changing category of each product in a specific category
            for (let i = 0; i < productsOfCategory.length; i++) {
                 productsOfCategory[i].category = Category.scrubCategories(category.title, categoriesOfDb)
                 allProductsOfMathem.push(productsOfCategory[i]);
            }
          }
          console.log('Harvesting of Mathem is done!');
          return allProductsOfMathem;
    
      }

    }

     


