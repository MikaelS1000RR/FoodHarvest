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
          i = 0;
          batch = firestore.batch();
        } catch (err) {
        }
      }
    });

    try {
      batch.commit();
    } catch (err) {
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
  
  //Another way to post products

  static async postProduct(collection, products) {
    for (let i = 0; i < products.length; i++) {
      let productToPost = products[i];
      firestore.collection(collection).doc().set(productToPost);
    }
  }
}
