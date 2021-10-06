import data from "./DbInitData.js"
import firestore from "./database_config/firestore.js";
export class DbInit {
  // initialize db
  static run() {
    console.log("hej");
    // console.log(data.categories);
    // initStore()
    // this.initCategories();
  }

  static initStores = () => {
    let collection = data.stores.collection;
    for (let store of data.stores.stores) {
      firestore.collection(collection).doc().set(store);
    }
  };

  static initCategories = () => {
    let collection = data.categories.collection;
    for (let category of data.categories.categories) {
      firestore.collection(collection).doc().set(category)
    }
  };
}