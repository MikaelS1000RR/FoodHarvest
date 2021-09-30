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
      let productList = new ProductList(req.body.uid, req.body.name, [], req.body.isFavorite);
      try {
        let addedList = await firestore.collection("product-lists").add(Object.assign({}, productList));
        console.log("Adding success");
        res.json({success: "Posting successful"})
      }
      catch (error) {
        console.log("Error", error);
        res.json({error: "Posting of productlist unsuccessful"})
      }
    })

    //add product to list
    this.app.put("/api/product-list", async (req, res) => {
      let list = req.body.list;
      let listRef = firestore.collection('product-lists').doc(list.id)
      list = await listRef.get();
      if (!list) {
        res.json({ error: "List do not exist" })
        return;
      }
      list = list.data()
      let product = req.body.product;
      let productRef = firestore.collection('products').doc(product.id)
      list.products = [...list.products, productRef]
      try {
        await listRef.update({ products: list.products });
        res.json({success: "Posting successful"})
      }
      catch (error) {
        console.log("Error", error);
        res.json({error: "Posting of productlist unsuccessful"})
      }
    })
  }
}
