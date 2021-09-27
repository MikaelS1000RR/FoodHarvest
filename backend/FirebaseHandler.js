import firestore from "./database_config/firestore.js";
import { Product } from "./Models/Product.js";

export class FirebaseHandler {
  //Getting stores from db
  static async getStoreId(storeName) {
    let store = await firestore
      .collection("stores")
      .where("name", "==", storeName)
      .get();
    let id = "";
    store.forEach((doc) => {
      id = doc.id;
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

  //Another way to post products

  static async postProduct(products) {
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
        store:  firestore.doc('stores/' + await this.getStoreId(product.store.storeName)),
        discount: {
          discountType: product.discount.discountType,
          quantityToBeBought: product.discount.quantityToBeBought,
          displayPrice: product.discount.displayPrice,
          savings: product.discount.savings,
          percentageSavings: product.discount.percentageSavings,
          isMemberDiscount: product.discount.isMemberDiscount,
        },
      };
      firestore.collection("test-products-willys").doc().set(productToPost);
    }
    console.log("posted product in db!");
  }
} 