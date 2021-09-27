
import express from "express";
import path from "path";
import { TestHarvesting } from "./Harvesters/TestHarvesting.js";

const app = express();


app.use(express.json());

app.use(express.static("frontend")); 


TestHarvesting.test();

app.listen(3000, () => console.log("Listening on port 3000"));




