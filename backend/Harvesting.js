import fs from "fs";
import { FirebaseHandler } from "./FirebaseHandler.js";
import { HemkopHandler } from "./Handlers/HemkopHandler.js"
import { MathemHandler } from "./Handlers/MathemHandler.js";
import { WillysHandler } from "./Handlers/WillysHandler.js";


export class Harvesting {
  static async run() {
    
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    WillysHandler.run();
    HemkopHandler.run();
    MathemHandler.run();
  }


}
