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
      if (productList.isFavorite) {
        const snapshot = await firestore
          .collection("product-lists")
          .where("uid", "==", req.body.uid)
          .where("isFavorite", "==", req.body.isFavorite)
          .get();
        const favoriteExist = !snapshot.empty;
        if (favoriteExist) {
          res.json({ error: "Favorite already exist" })
          return;
        }
      }
      try {
        let addedList = await firestore.collection("product-lists").add(Object.assign({}, productList));
        res.json({success: "Posting successful"})
      }
      catch (error) {
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

      let toAdd = req.body.toAdd;
      let productExist = list.products.find(p => p.id == productRef.id)
      if (productExist) {
        if (toAdd) { 
          res.json({ error: "Product already in the list!" });
          return;
        }
        else {
          console.log("remove product");
          list.products = list.products.filter(p => p.id != productRef.id)
        }
      }
      else if (toAdd) {
        console.log("add to list");
        list.products = [...list.products, productRef]
      }

      // update list
      try {
        await listRef.update({ products: list.products });
        console.log("update successful");
        res.json({success: "Posting successful"})
      }
      catch (error) {
        res.json({error: "Posting of productlist unsuccessful"})
      }
    })
  }
}
