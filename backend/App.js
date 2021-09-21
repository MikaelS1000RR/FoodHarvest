import db from "./database.js";
import express from "express";

// const express = require("express");
const app = express();

// app.use(static("frontend")); // if doesn't work then try ../frontend

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
