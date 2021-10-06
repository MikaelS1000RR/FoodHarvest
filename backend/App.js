
import express from "express";
import path from "path";
import { Harvesting } from "./Harvesting.js";
import { Rest } from "./commands/Rest.js"
import { Api } from "./commands/Api.js"
import { DbInit } from "./DbInit.js";

const app = express();

app.use(express.json());
let api = new Api(app);
let rest = new Rest(app);

// DbInit.run();

// Harvesting.run();

app.listen(4000, () => console.log("Listening on port 4000"));