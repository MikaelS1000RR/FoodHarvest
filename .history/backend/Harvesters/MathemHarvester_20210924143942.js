import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js'
import { Category } from '../Models/Category.js'

export class MathemHarvester {
    static bustCache() {
        return "?avoidCache=" + (Math.random() + "").split(".")[1];
    }

    static async getCategories() {
        let raw = await fetch(
            "https://api.mathem.io/ecom-navigation/noauth/v3/menu/10" + this.bustCache()
        );
        return await raw.json();
    }

    static async getProducts(categoryURL) {
        let raw = await fetch(
            "https://api.mathem.io/product-search/noauth/search/products/10/weeklydiscounts?size=18&index=0&storeId=10&keyword=" +
           categoryURL + this.bustCache() + "&size=10000"
        );
        return await raw.json();
    }

    static setCategory(categoryName) {
        let newCategory = new Category(categoryName);
        return newCategory;
      }

      static async getAllProducts(categories) {
    
        let allProductsOfMathem = [];
        let categories
    
    }

     


}
