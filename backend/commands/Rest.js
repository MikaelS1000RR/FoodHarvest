import firestore from "../database_config/firestore.js";

export class Rest {
  constructor(app) {
    this.app = app;
    this.start();
  }

  start() {
    // get products
    this.app.post("/rest/products", async (req, res) => {
      let categoryId = req.body.categoryId;
      let currentList = req.body.currentList;
      let limit = req.body.limit || 20;

      try {
        let products = [];
        let snapshot = await firestore
          .collection("test-products")
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
      let search = req.body.search;
      let currentList = req.body.currentList;
      let limit = req.body.limit || 10;

      try {
        let products = [];  
        let snapshot = await firestore
          .collection("test-products")
          .where("productName", ">=", search)
          .orderBy("productName")
          .startAt(search)
          .limit(limit)
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
