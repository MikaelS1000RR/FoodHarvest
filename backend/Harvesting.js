import fs from "fs";
import { FirebaseHandler } from "./FirebaseHandler.js";
import { HemkopHandler } from "./Handlers/HemkopHandler.js"
import { WillysHandler } from "./Handlers/WillysHandler.js";


export class Harvesting {
  static async run() {


     function writeToFile(fileName, data) {
       fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
     }
    //Here we get all categories from Mathem
    let categories = await MathemHarvester.getCategories();



    //Here we use all categories to get products from each category
    let allProductsOfMathem = await MathemHarvester.getProductsFromCategories(categories)


    let scrubbedProductsOfMathem=await MathemScrubber.scrubAll(allProductsOfMathem)
    writeToFile('scrubbed-mathem.json', scrubbedProductsOfMathem)
    
    //Deleting collection before posting anything
   /*  await FirebaseHandler.deleteCollection("products");

    WillysHandler.run();
    HemkopHandler.run();
    */
  }


}
