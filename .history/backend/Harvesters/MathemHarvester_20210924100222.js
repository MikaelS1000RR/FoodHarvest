import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js'
import { Category } from '../Models/Category.js'

export class MathemHarvester {
    static bustCache() {
        return "?avoidCache=" + (Math.random() + "").split(".")[1];
    }

    static async getAllCategories() {
        let categories;
       let allCategoriesOfMathem = [];
       for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let categoryOfProducts = await this.getProducts(category.url);

        for (let i = 0; i < productsOfCategory.length; i++){
            if (category.url.includes("banan")) {
                productsOfCategory[i].category = this.setCategory("Frukt & Grönt");
              } 
              else {
                  console.log('nothing here')
              }
       } 
       allCategoriesOfMathem.push(categoryOfProducts);

        }
        return allCategoriesOfMathem;
    }

    static async getProducts(categoryURL) {
        let raw = await fetch(
            "https://api.mathem.io/product-search/noauth/search/products/10/weeklydiscounts?size=18&index=0&storeId=10&keyword=" +
           categoryURL + this.bustCache() + "&size=10000"
        );
        return await raw.json();
    }



}
