import firestore from "./database_config/firestore.js";

export class Api {
  constructor(app) {
    this.app = app;
    this.start();
  }

  start() {

    // createProductList
    this.app.get("/api/", (req, res) => {
      console.log("in the get ***************************");
      res.json({message: "hello world"});
    });
  }
}
