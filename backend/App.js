
import express from "express";
import path from "path";
import { TestHarvesting } from "./Harvesters/TestHarvesting.js";
import { HemkopTest } from "./Harvesters/HemkopTest.js";

const app = express();

app.use(express.json());

// HemkopTest.test();
// TestHarvesting.test();

app.listen(3000, () => console.log("Listening on port 3000"));