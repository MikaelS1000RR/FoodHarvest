import firestore from "./database_config/firestore.js";
import { Preference } from "./Models/Preference.js";
import { Product } from "./Models/Product.js";

export class FirebaseHandler {
  //Getting stores from db

  // gets the reference id from db
  static getIdByProperty = async (collection, key, property) => {
    let querySnapshot = await firestore
      .collection(collection)
      .where(key, "==", property)
      .get();
    let id = "";
    querySnapshot.forEach((doc) => {
      if (doc.id) {
        id = doc.id;
        return;
      }
    });
    return id;
  }

  // returns the reference of the document in the collection, key is the name of property
  static getOneRef = async (doc, collection, key) => {
    let property = doc[key];
    if (doc != null && property) {
      let id = await this.getIdByProperty(collection, key, property);
      if (id) {
        let ref = firestore.doc(collection + "/" + id);
        return ref;
      }
    }
    return null;
  };

  // returns an array of references of the documents
  static getAllRefs = async (docs, collection, key) => {
    let refs = [];
    if (docs != null && docs.length > 0) {
      for (let doc of docs) {
        let ref = await this.getOneRef(doc, collection, key);
        if (ref != null) {
          refs.push(ref);
        }
      }
    }
    return refs;
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
        category: await this.getOneRef(product.category, "categories", "name"),
        preferences: await this.getAllRefs(product.preferences, "preferences", "name"),
        ean: product.ean,
        store: await this.getOneRef(product.store, "stores", "name"),
        discount: {
          discountType: product.discount.discountType,
          quantityToBeBought: product.discount.quantityToBeBought,
          displayPrice: product.discount.displayPrice,
          savings: product.discount.savings,
          percentageSavings: product.discount.percentageSavings,
          isMemberDiscount: product.discount.isMemberDiscount,
        },
      };
      // console.log(productToPost);
      firestore.collection("test-products-willys").doc().set(productToPost);
    }
    console.log("posted product in db!");
  }
}

const getRefs = async (docs, collection, property) => {
  let refs = [];
  if (docs != null && docs.length > 0) {
    for (let doc of docs) {
      let ref = getOneRef(collection, doc, property);
      refs.push(ref);
    }
  }
  return refs;
};