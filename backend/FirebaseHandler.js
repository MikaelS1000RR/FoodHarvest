import firestore from "./database_config/firestore.js";
import { Preference } from "./Models/Preference.js";
import { Product } from "./Models/Product.js";

export class FirebaseHandler {
  //Getting stores from db

  //Delete products in collection
  static async deleteCollection(path) {
    await firestore
      .collection(path)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      })
      .then(() => {
        console.log("Collection has been deleted");
      });
  }

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
  };

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
  };

  static async getCategories() {
    let querySnapshot = await firestore.collection("categories").get();
    let categories = [];
    querySnapshot.forEach((document) => {
      categories.push(document.data());
    });

    return categories;
  }

  static async getStore(storeName) {
    let querySnapshot = await firestore
      .collection("stores")
      .where("name", "==", storeName)
      .get();
    let dataFromDB = [];
    querySnapshot.forEach((document) => {
      let doc = { ref: document.ref, ...document.data() };
      dataFromDB.push(doc);
    });
    console.log("dataFromDB", dataFromDB);
    return dataFromDB[0];
  }

  static async getPreferences() {
    let querySnapshot = await firestore.collection("preferences").get();
    let dataFromDB = [];
    querySnapshot.forEach((document) => {
      let doc = { ref: document.ref, ...document.data() }
      dataFromDB.push(doc);
    });

    return preferences;
  }

  static setDiscount(product) {
    let discount=product.discount
    if(product.discount!=null){

      let discountObj = {
        discountType: product.discount.discountType,
        quantityToBeBought: product.discount.quantityToBeBought,
        displayPrice: product.discount.displayPrice,
        savings: product.discount.savings,
        percentageSavings: product.discount.percentageSavings,
        isMemberDiscount: product.discount.isMemberDiscount,
      };
      return discountObj;
    }
    else{
      return null
    }
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
        preferences: await this.getAllRefs(
          product.preferences,
          "preferences",
          "name"
        ),
        //ean: product.ean,
        store: await this.getOneRef(product.store, "stores", "name"),
        discount: this.setDiscount(product)
      };
      // console.log(productToPost);
      firestore.collection("products").doc().set(productToPost);
    }
    console.log("Posted product in db!");
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