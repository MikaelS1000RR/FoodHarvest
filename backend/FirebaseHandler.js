import firestore from "./database_config/firestore.js";
import { Product } from "./Models/Product.js";

export class FirebaseHandler {

  //Getting stores from db
  static async getStores() {
    let querySnapshot = await firestore.collection("stores").get();
    let stores = [];
    querySnapshot.forEach((document) => {
      stores.push(document.data());
    });
    console.log(stores);
    return stores;
  }


  //Getting categories from db
  static async getCategories() {
    let querySnapshot = await firestore.collection("categories").get();
    let categories = [];
    querySnapshot.forEach((document) => {
      categories.push(document.data());
    });
    
    return categories;
  }



  static async getPreferences() {
     let querySnapshot = await firestore.collection("preferences").get();
     let preferences = [];
     querySnapshot.forEach((document) => {
       preferences.push(document.data());
     });

     return preferences;
  }




  //posting all products to db
  static postProducts(products) {
   
    for (let i = 0; i < products.length; i++) {
      let product = products[i]
      
      let productToPost = {
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        quantityUnit: product.quantityUnit,
        comparisonUnit: product.comparisonUnit,
        comparisonPrice: product.comparisonPrice,
        brand: product.brand,
        imageUrl: product.imageUrl,
        category: JSON.stringify(product.category),
        preferences: JSON.stringify(product.preferences),
        ean: product.ean,
        store: JSON.stringify(product.store),
        discount: JSON.stringify(product.discount)
      };
   
      firestore.collection("products").doc().set(productToPost);
    }

    console.log("product posting completed!");
  }
}