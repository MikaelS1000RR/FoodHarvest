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

  //Another way to write products to db
  //Need to update preferences and scrubber on all stores' preferences
  static postProduct(product) {
     
      let productToPost = {
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        quantityUnit: product.quantityUnit,
        comparisonUnit: product.comparisonUnit,
        comparisonPrice: product.comparisonPrice,
        brand: product.brand,
        imageUrl: product.imageUrl,
        category: {
          name: product.category.categoryName
        },
        preferences: JSON.stringify(product.preferences),
        ean: product.ean,
        store: {
          storeName: product.store.storeName, //this
          logoUrl: product.store.logoUrl,
        },
        discount: {
          discountType: product.discount.discountType,
          quantityToBeBought: product.discount.quantityToBeBought,
          displayPrice: product.discount.displayPrice,
          savings: product.discount.savings,
          percentageSavings: product.discount.percentageSavings,
          isMemberDiscount: product.discount.isMemberDiscount,
        },
      };

      firestore.collection("test-products").doc().set(productToPost);
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
        store: {storeName: product.store.storeName, logoUrl: product.store.logoUrl},
        discount: JSON.stringify(product.discount)
      };
   
      firestore.collection("products").doc().set(productToPost);
     
    }

    console.log("product posting completed!");
  }

  static async testProduct() {
      firestore
        .collection("test-products")
        .doc()
        .set({
          name: "Dumbbell curl",
          muscle: "Biceps",
          sets: [
            { reps: 10, weight: 40 },
            { reps: 10, weight: 40 },
            { reps: 10, weight: 40 },
          ],
        });
  }
}