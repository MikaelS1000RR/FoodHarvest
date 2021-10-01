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

    static async getProducts(categoryURL) {
        // Create an empty array
        // Write for-loop to loop products in categories
        // Store products from categories in array 
        let raw = await fetch(
            "https://api.mathem.io/product-search/noauth/categorylist/" 
            + categoryURL + 
            "?storeId=16&productSizePerCategory=210&categorySize=200"
        );
        return await raw.json();
    }


    //Sending mathem categories as argument for the function
    static async getProductsFromCategories(mCategories) {
      let productStorage = [];
      let categoriesOfDb = await FirebaseHandler.getCategories();
      console.log('Harvesting of Mathem has started');

        for(let i = 0; i < mCategories.length; i++) {
          let category = mCategories[i];
          //For every category that we send we get so called "category object"
          //Category object has products array inside so we have to take this array
          // CategoriesObj: {
          /*    categories: [
                   products: [
                     //...here are the products that we need
                            ]
                ]
            } (this is how categoriesObj looks if we write it to console)*/
          let categoriesObj = await this.getProducts(category.id);
         
          let productsArr = categoriesObj.categories[0].products;

          //For every product that we get inside of products array, we push the product to our own array
          //And scrub categories for this product
          for (let j = 0; j < productsArr.length; j++) {
            productsArr[j].category = Category.scrubCategories(category.title, categoriesOfDb)
            
            productStorage.push(productsArr[j]);
          }
         
      }
       console.log("length of prodcuts is ", productStorage.length);
      console.log('Harvesting of mathem is done!');

        return productStorage;
    }

    static setCategory(categoryName) {
        let newCategory = new Category(categoryName);
        return newCategory;
      }

    }

     



