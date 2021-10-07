import firestore from "./database_config/firestore.js";

export class FirebaseHandler {
  // Posting products in batch (still creates separate writes to DB..)
  static postProductsInBatch(collection, productArray) {
    let batch = firestore.batch();
    let i = 0;
    productArray.forEach((product) => {
      i++;
      let docRef = firestore.collection(collection).doc();
      batch.set(docRef, product);
      if (i >= 300) {
        try {
          batch.commit();
          console.log("Write to DB succeeded");
          i = 0;
          batch = firestore.batch();
        } catch (err) {
          console.log("Write to DB failed: ", err);
        }
      }
    });

    try {
      batch.commit();
      console.log("Write to DB succeeded");
    } catch (err) {
      console.log("Write to DB failed: ", err);
    }
  }

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

  static async getCategories() {
    let querySnapshot = await firestore.collection("categories").get();
    let categories = [];
    querySnapshot.forEach((document) => {
      categories.push({ id: document.id, ...document.data() });
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
      let doc = { id: document.id, ...document.data() };
      dataFromDB.push(doc);
    });
    return dataFromDB[0];
  }

  static async getPreferences() {
    let querySnapshot = await firestore.collection("preferences").get();
    let dataFromDB = [];
    querySnapshot.forEach((document) => {
      let doc = { id: document.id, ...document.data() };
      dataFromDB.push(doc);
    });

    return dataFromDB;
  }

  static setDiscount(product) {
    let discount = product.discount;
    if (product.discount != null) {
      let discountObj = {
        discountType: product.discount.discountType,
        quantityToBeBought: product.discount.quantityToBeBought,
        displayPrice: product.discount.displayPrice,
        savings: product.discount.savings,
        percentageSavings: product.discount.percentageSavings,
        isMemberDiscount: product.discount.isMemberDiscount,
      };
      return discountObj;
    } else {
      return null;
    }
  }
  //Another way to post products

  static async postProduct(collection, products) {
    for (let i = 0; i < products.length; i++) {
      let productToPost = products[i];
      firestore.collection(collection).doc().set(productToPost);
    }
    console.log("Posted product in db!");
  }
}
