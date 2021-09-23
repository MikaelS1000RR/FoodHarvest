
import express from "express";
import path from "path";
import { TestHarvesting } from "./Harvesters/TestHarvesting.js";

const app = express();
// const __dirname = path.resolve();

app.use(express.json());

app.use(express.static("frontend")); // if doesn't work then try ../frontend
// app.use(express.static(path.join(__dirname, "./www")));

TestHarvesting.test();

app.listen(3000, () => console.log("Listening on port 3000"));

// async function getTestData() {
//   let querySnapshot = await firestore.collection("test-products").where("category", "==", "Fisk").get();
//   let data = [];
//   querySnapshot.forEach((document) => {
  //   let doc = document.data();
  // doc.ref = document.id
//     data.push(doc);   +doc.id
//   });
//   console.log(data);
// }

/*async function getTestData() {
  let querySnapshot = await firestore
    .collection("stores")
    .get();
  let data = [];
  querySnapshot.forEach((document) => {
    data.push(document.data());
  });
  console.log(data);

}
*/

// function writeTestData() {
//   const foodItem = {
//     brand: "Mjau",
//     category: "Kattmat",
//     foodType: "Lax i sås",
//     price: "400",
//   };
//   firestore.collection("test-products").doc().set(foodItem);
// }

// function getTestData2() {
//   const foods = firestore.collection("test-products");
//   const queryRef = foods.where("category", "==", "Fisk");
//   console.log(queryRef);
// }

// writeTestData();
// getTestData();

// getTestData();


console.log("End of code*************")