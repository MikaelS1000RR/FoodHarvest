
import express from "express";
import path from "path";
import { HemkopTest } from "./Harvesters/HemkopTest.js";
import { Harvesting } from "./Harvesting.js";
import { Api } from "./Api.js";

const app = express();

app.use(express.json());
let api = new Api(app);

// HemkopTest.test();
// TestHarvesting.test();
// Harvesting.run();

app.listen(3000, () => console.log("Listening on port 3000"));