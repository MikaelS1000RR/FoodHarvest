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
            "?storeId=16&productSizePerCategory=1&categorySize=20"
        );
        return await raw.json();
    }


    //Sending mathem categories as argument for the function
    static async getProductsFromCategories(mCategories) {
        let productStorage = [];

        //For every category that we send we get category object
        
        for(let i = 0; i < mCategories.length; i++) {
            let category = mCategories[i];

            //Category object has products array inside to we have to take it
            // CategoriesObj: {
           /*    categories: [
                   products: [
                     //...here are the products
                            ]
                ]
            } (this is how categoriesObj looks if we write it to console)*/
            let categoriesObj = await this.getProducts(category.id)
            let productsArr = categoriesObj.categories[0].products
   
            //For every product that we get inside of products array, we push the product to our own array
            for (let j = 0; j < productsArr.length; j++){
                productStorage.push(productsArr[j])
            }
         
           
            
        }

        return productStorage;
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

     



