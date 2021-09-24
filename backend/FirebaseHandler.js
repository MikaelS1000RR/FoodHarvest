import firestore from "./database_config/firestore.js";
import { Product } from "./Models/Product.js";

export class FirebaseHandler {
  static async getStores() {
    let querySnapshot = await firestore.collection("stores").get();
    let stores = [];
    querySnapshot.forEach((document) => {
      stores.push(document.data());
    });
    console.log(stores);
    return stores;
  }

  static async getCategories() {
    let querySnapshot = await firestore.collection("categories").get();
    let categories = [];
    querySnapshot.forEach((document) => {
      categories.push(document.data());
    });
    
    return categories;
  }

  static postProducts(product) {
    //let product=products[i]
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
   /* let productToPost = {
      productName: "test",
      price: "test",
      quantity: "test",
      quantityUnit: "test",
      comparisonUnit: "test",
      comparisonPrice: "test",
      brand: "test",
      imageUrl: "test",
      category: "test",
      preferences: "test",
      ean: "test",
      store: "test",
      discount: "test",
        
    }*/

    firestore.collection("products").doc().set(productToPost);

    console.log("product posting completed!");
  }
}