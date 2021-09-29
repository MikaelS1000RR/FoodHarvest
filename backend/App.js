
import express from "express";
import path from "path";
import { Harvesting } from "./Harvesting.js";

const app = express();

app.use(express.json());

// Harvesting.run();

app.listen(3000, () => console.log("Listening on port 3000"));