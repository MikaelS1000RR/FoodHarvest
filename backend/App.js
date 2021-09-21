import db from "./database.js";
import express from "express";
import path from "path";

const app = express();
// const __dirname = path.resolve();

app.use(express.json());

// app.use(static("frontend")); // if doesn't work then try ../frontend
// app.use(express.static(path.join(__dirname, "./www")));

app.listen(3000, () => console.log("Listening on port 3000"));

async function getTestData() {
  let querySnapshot = await db.collection("test-products").get();
  let data = [];
  querySnapshot.forEach((document) => {
    data.push(document.data());
  });
  console.log(data);
}

getTestData();

// getTestData2() {
//   app.get("/rest/:model", async (req, res) => {


//   }
// }