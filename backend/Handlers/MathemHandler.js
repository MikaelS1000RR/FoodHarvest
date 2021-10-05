import { MathemHarvester } from "../Harvesters/MathemHarvester.js";
import { MathemScrubber } from "../Scrubbers/MathemScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";
import fs from "fs";

export class MathemHandler {
  static async run() {
    
    // Categories 
    MathemScrubber.getInformationFromDb();
    // ----------------------------------------------------------

    //Harvesting
    let mathemsCategories = await MathemHarvester.getCategories();
    let getMathemsProducts = await MathemHarvester.getProductsFromCategories(mathemsCategories);

    //Scrubbing
    let scrubbedMathemProducts = await MathemScrubber.scrubAll(getMathemsProducts);

    //Posting
    FirebaseHandler.postProduct(scrubbedMathemProducts);


    function writeToFile(fileName, data) {
      try {
        fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
        console.log("success");
      } catch (err) {
        console.log(err);
      }
    }

    writeToFile(
      "C:/Users/Jonathan/Documents/GitHub/FoodHarvest/backend/getMathemsProducts.txt", getMathemsProducts
    );


    writeToFile(
      "C:/Users/Jonathan/Documents/GitHub/FoodHarvest/backend/scrubbedMathemProducts.txt", scrubbedMathemProducts
    );
  }
}