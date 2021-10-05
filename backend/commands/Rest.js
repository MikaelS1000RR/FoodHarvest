import firestore from "../database_config/firestore.js";

export class Rest {
  constructor(app) {
    this.app = app;
    this.start();
  }

  start() {
    // createProductList
    this.app.put("/rest/products", async (req, res) => {
      let categoryId = req.body.categoryId;
      let favoriteList = req.body.favoriteList;
      let limit = req.body.limit || 20;

      console.log("faves");
      console.log(favoriteList);

      let products = []
      let snapshot = await firestore
        .collection("products")
        .where("category", "==", categoryId)
        .limit(limit)
        .get();
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      })

      if (favoriteList) {
        for (let product of products) {
          let isFavorite = !!favoriteList.products.find(p => p.productCode === product.productCode)
          product.isFavorite = isFavorite
        }
      }

      res.json({ success: "Fetching successful", products: products });
    });

  }
}
