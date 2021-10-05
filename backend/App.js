
import express from "express";
import path from "path";
import { Harvesting } from "./Harvesting.js";
import { Api } from "./Api.js";

const app = express();

app.use(express.json());
let api = new Api(app);

//Harvesting.run();

app.listen(4000, () => console.log("Listening on port 4000"));