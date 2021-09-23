import firestore from "./database_config/firestore.js";

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
}