import fs from "fs";
import { FirebaseHandler } from "./FirebaseHandler.js";
import { HemkopHandler } from "./Handlers/HemkopHandler.js"
import { WillysHandler } from "./Handlers/WillysHandler.js";


export class Harvesting {
  static async run() {
    //Deleting collection before posting anything
    // await FirebaseHandler.deleteCollection("products");

    console.log("WillysHandler run");
    WillysHandler.run();

    // HemkopHandler.run();
  }



}
