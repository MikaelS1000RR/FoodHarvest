import fs from "fs";
import { FirebaseHandler } from "./FirebaseHandler.js";
import { HemkopHandler } from "./Handlers/HemkopHandler.js";
import { MathemHandler } from "./Handlers/MathemHandler.js";
import { WillysHandler } from "./Handlers/WillysHandler.js";

export class Harvesting {
  static async run() {
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    const productCollection = "products";
    const productPerCategory = 100;
    await FirebaseHandler.deleteCollection(productCollection);

    WillysHandler.run(productCollection, productPerCategory);
    HemkopHandler.run(productCollection, productPerCategory);
    MathemHandler.run(productCollection, productPerCategory);
  }
}
