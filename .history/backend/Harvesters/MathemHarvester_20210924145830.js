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
        return (await raw.json()).results
    }

    static setCategory(categoryName) {
        let newCategory = new Category(categoryName);
        return newCategory;
      }

      static async getAllProducts(categories) {
    
        let allProductsOfMathem = [];
        let categoriesOfDb = await FirebaseHandler.getCategories();

        for (let i = 0; i < categories.length; i++) {
            let category = categories[i];
            let productsOfCategory = await this.getProducts(category.url);

            let categoryFromDb = ''

            for (let i = 0; i < productsOfCategory.length; i++) {
                 console.log('reached here');

                if (category.url.includes("kott-o-chark")) {
                    productsOfCategory[i].category = this.setCategory("Kött, Fågel & Chark");
                  }

                  allProductsOfMathem.push(productsOfCategory);

            }

            return allProductsOfMathem;
        }
    
    }

     


}
