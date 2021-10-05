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

    this.app.put("/api/product-list", async (req, res) => {
      let list = req.body.list;
      let product = req.body.product;
      let toAdd = req.body.toAdd;
      let user = req.body.user;

      let listRef = firestore.collection('product-lists').doc(list.id)
      if (!listRef) {
        res.json({ error: "List do not exist" })
        return;
      }
      
      let productExist = list.products.find(p => p.productCode == product.productCode)
      if (productExist) {
        if (toAdd) { 
          res.json({ error: "Product already in the list!" });
          return;
        }
        // remove the product
        else {
          list.products = list.products.filter(p => p.productCode != product.productCode)
        }
      }
      // add the product
      else if (toAdd) {
        let newProduct = {
          productCode: product.productCode,
          quantity: 1
        }
        list.products = [...list.products, newProduct]
      }
      // update list
      try {
        if (user) {
          await listRef.update({ products: list.products });
        }
        res.json({
          success: "Update successful",
          newList: list
        })
      }
      catch (error) {
        res.json({error: "Updating of productlist unsuccessful"})
      }
    })

    this.app.put("/api/product-list/product", async (req, res) => {
      // to update products in productlist
    })
  }
}
