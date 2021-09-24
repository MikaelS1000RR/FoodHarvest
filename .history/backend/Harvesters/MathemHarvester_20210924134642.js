import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js'
import { Category } from '../Models/Category.js'

export class MathemHarvester {
    static bustCache() {
        return "?avoidCache=" + (Math.random() + "").split(".")[1];
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

     static async getCategories(products) {
        let AllProductsOfMathem = [];
        let productsOfDb = await FirebaseHandler.getProducts();
        let categoryFromDb=''

        for(let i = 0; i < products.length; i++) {
        let product = products[i]
        let categoryOfProducts = await this.getProducts(product.url);
        
            for(let i = 0; i < categoryOfProducts; i++) {
                console.log('reached here...')
            }
        }
     }


}
