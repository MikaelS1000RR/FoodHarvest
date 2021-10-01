import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js'
import { Category } from '../Models/Category.js'

export class MathemHarvester {
    static bustCache() {
        return "?avoidCache=" + (Math.random() + "").split(".")[1];
    }

    static async getAllCategories(products) {
        let getAllCategoriesOfWillys = [];
        
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            let categoryOfProduct = await this.getProducts(product.)
        }
    }

    static async getProducts(categoryURL) {
        let raw = await fetch(
            "https://api.mathem.io/product-search/noauth/search/products/10/weeklydiscounts?size=18&index=0&storeId=10&keyword=" +
           categoryURL + this.bustCache() + "&size=10000"
        );
        return await raw.json();
    }



}