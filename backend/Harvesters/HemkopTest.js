import fs from "fs";
import { HemkopHarvester } from "./HemkopHarvester.js"; 

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

    // writeToFile(
    //   "C:/Users/Denise/Documents/GitHub/FoodHarvest/backend/hemkoptest.txt", unscrubbedHemkopProducts
    // );



    //Scrubbing all products
     let scrubbedHemkopProducts = await HemkopScrubber.scrubAll(unscrubbedHemkopProducts);

    //Posting scrubbed products into db
    // FirebaseHandler.postProduct(scrubbedHemkopProducts);
  }
}
