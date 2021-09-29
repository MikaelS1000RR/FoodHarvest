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
  static getRefByProperty = async (collection, key, property) => {
    let querySnapshot = await firestore
      .collection(collection)
      .where(key, "==", property)
      .get();
    let ref = "";
    querySnapshot.forEach((doc) => {
      if (doc.ref) {
        ref = doc.ref;
        return;
      }
    });
    return ref;
  };

  static getObjectByProperty = async (collection, key, property) => {
    console.log('collection :'+ collection + 'key: '+ key + ' property: ' + property);
    let querySnapshot = await firestore
      .collection(collection)
      .where(key, "==", property)
      .get();
    let toReturn = {};
    querySnapshot.forEach((doc) => {
      if (doc.ref) {
        toReturn = { ref: doc.ref, ...doc.data()};
        return;
      }
    });
    return toReturn;
  };

  // returns the reference of the document in the collection, key is the name of property
  static getOneRef = async (doc, collection, key) => {
    let property = doc[key];
    if (doc != null && property) {
      let ref = await this.getRefByProperty(collection, key, property);
      if (ref) {
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
      categories.push({ ref: document.ref, ...document.data() });
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
        category: product.category.ref,
        //preferences: product.preferences,
        //ean: product.ean,
        store: product.store.ref,
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