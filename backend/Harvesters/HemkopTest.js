import fs from "fs";
import { HemkopHarvester } from "./HemkopHarvester.js";
import { HemkopScrubber } from "../Scrubbers/HemkopScrubber.js"

export class HemkopTest {
  static async test() {
    let rawData = await HemkopHarvester.getCategories();
    let categories = rawData.children;

    // write to file for now (goal: write to DB instead)
    function writeToFile(fileName, data) {
      try {
        fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
        console.log("success");
      } catch (err) {
        console.log(err);
      }
    }

    let unscrubbedHemkopProducts = await HemkopHarvester.getAllProducts(categories);
    let scrubbedHemkopProducts = [];

    //Scrubbing all products
    await HemkopScrubber.setStore().then(async () => {
      scrubbedHemkopProducts = await HemkopScrubber.scrubAll(unscrubbedHemkopProducts);
      writeToFile(
        "C:/Users/Denise/Documents/GitHub/FoodHarvest/backend/hemkoptest.txt",
        scrubbedHemkopProducts
      );
    });


    

    //Posting scrubbed products into db
    // FirebaseHandler.postProduct(scrubbedHemkopProducts);
  }
}
