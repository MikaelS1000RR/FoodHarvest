import firestore from "./database_config/firestore.js";
import { ProductList } from "./Models/ProductList.js";

export class Api {
  constructor(app) {
    this.app = app;
    this.start();
  }

  start() {

    // createProductList
    this.app.post("/api/product-list", async (req, res) => {
      let productList = new ProductList(req.body.uid, req.body.name, [], false);
      // await firestore.collection("product-lists").doc().set(productList);
      console.log(productList);
      res.json({success: "Posting successful"})
    })
  }
}
