import firestore from "./database_config/firestore.js";
import { Product } from "./Models/Product.js";

export class FirebaseHandler {

  //Getting stores from db
  static async getStoreId(storeName) {
    let store = await firestore.collection("stores").where('name', '==', storeName).get()
    let id=''
    store.forEach((doc) => {
      id=doc.id
    });
    
    
    return id;
  }


  //Getting categories from db
  static async getCategoryId(categoryName) {
     let category = await firestore
       .collection("categories")
       .where("name", "==", categoryName)
       .get();
     let id = "";
     category.forEach((doc) => {
       id = doc.id;
     });

     return id;
  }



  static async getPreferenceId(preferenceName) {
      let preference = await firestore
        .collection("preferences")
        .where("name", "==", preferenceName)
        .get();
      let id = "";
      preference.forEach((doc) => {
        id = doc.id;
      });

      return id;
  }


  

  //Another way to post products

  static postProduct(products) {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let productToPost = {
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        quantityUnit: product.quantityUnit,
        comparisonUnit: product.comparisonUnit,
        comparisonPrice: product.comparisonPrice,
        brand: product.brand,
        imageUrl: product.imageUrl,
        category: product.category,
        preferences: product.preferences,
        ean: product.ean,
        store: {
          name: product.store.storeName,
          logoUrl: product.store.logoUrl,
        },
        discount: {
          discountType: product.discount.discountType,
          quantityToBeBought: product.discount.quantityToBeBought,
          displayPrice: product.discount.displayPrice,
          savings: product.discount.savings,
          percentageSavings: product.discount.percentageSavings,
          isMemberDiscount: product.discount.isMemberDiscount
        },
      };
      firestore.collection("test-products").doc().set(productToPost);
    }
    console.log('posted product in db!');
  }



  //posting all products to db
/*   static postProducts(products) {
   
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
  }*/
} 