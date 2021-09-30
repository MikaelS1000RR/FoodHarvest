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
      try {
        await firestore.collection("product-lists").doc().set(Object.assign({}, productList));
        console.log("success");
        res.json({success: "Posting successful"})
      }
      catch (error) {
        console.log("Error", error);
        res.json({error: "Posting of productlist unsuccessful"})
      }
    })
  }
}
