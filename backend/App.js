
import express from "express";
import { Rest } from "./commands/Rest.js"
import { Api } from "./commands/Api.js"
import { ApiScheduler } from "./ApiScheduler.js";

const app = express();

app.use(express.json());
new Api(app);
new Rest(app);

ApiScheduler.run();

app.listen(4000, () => console.log("Listening on port 4000"));