import fetch from 'node-fetch'
import { FirebaseHandler } from '../FirebaseHandler.js'
import { Category } from '../Models/Category.js'

export class MathemHarvester {
  static async getCategories() {
    let raw = await fetch(
      "https://api.mathem.io/ecom-navigation/noauth/category/16"
    );
    return await raw.json();
  }

  static async getProducts(categoryURL, size) {
    let raw = await fetch(
      "https://api.mathem.io/product-search/noauth/categorylist/" +
        categoryURL +
        "?storeId=16&productSizePerCategory=20&categorySize=" +
        size
    );
    return await raw.json();
  }

  //Sending mathem categories as argument for the function
  static async getProductsFromCategories(mCategories, size) {
    let productStorage = [];
    let categoriesOfDb = await FirebaseHandler.getCategories();

    for (let i = 0; i < mCategories.length; i++) {
      let category = mCategories[i];

      let categoriesObj = await this.getProducts(category.id, size);

      let productsArr = categoriesObj.categories[0].products;

      //For every product that we get inside of products array, we push the product to our own array
      //And scrub categories for this product
      for (let j = 0; j < productsArr.length; j++) {
        productsArr[j].category = Category.scrubCategories(
          category.title,
          categoriesOfDb
        );

        productStorage.push(productsArr[j]);
      }
    }

    return productStorage;
  }

}

     



