import firestore from "../database_config/firestore.js";

export class Rest {
  constructor(app) {
    this.app = app;
    this.start();
  }

  start() {
    // get products
    this.app.post("/rest/products", async (req, res) => {
      console.log("fetching products");
      let categoryId = req.body.categoryId;
      let limit = req.body.limit || 20;

      try {
        let products = [];
        let snapshot = await firestore
          .collection("products")
          .where("category", "==", categoryId)
          .limit(limit)
          .get();
        snapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        res.json({ success: "Fetching successful", products: products });
      }
      catch (error) {
        res.json({ error: "Fetch failed" });
      }
    });

    this.app.post("/rest/products/search", async (req, res) => {
      let productNameStart = req.body.searchCodeStart;
      let productNameEnd = req.body.searchCodeEnd;
      // let favoriteList = req.body.favoriteList;
      // let currentList = req.body.currentList;
      
      try {
        const products = [];
        let snapshot = await firestore
          .collection("products")
          .where("productName", ">=", productNameStart)
          .where("productName", "<", productNameEnd)
          .limit(20)
          .get();
        
        snapshot.forEach((doc) => {          
          products.push({ id: doc.id, ...doc.data() })
          }
        );
        res.json({success: "Searching successful", products: products})
      }
      catch (error) {
        res.json({error: "Fetch failed"})
      }
    })
  }

}





