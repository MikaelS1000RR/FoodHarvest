
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


