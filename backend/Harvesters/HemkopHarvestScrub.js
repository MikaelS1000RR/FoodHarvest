import fs from "fs";
import { HemkopHarvester } from "./HemkopHarvester.js";
import { HemkopScrubber } from "../Scrubbers/HemkopScrubber.js"
import { FirebaseHandler } from "../FirebaseHandler.js";

export class HemkopHarvestScrub {
  static async run() {
    let rawData = await HemkopHarvester.getCategories();
    let categories = rawData.children;

    // function writeToFile(fileName, data) {
    //   try {
    //     fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    //     console.log("success");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // Harvesting
    let unscrubbedHemkopProducts = await HemkopHarvester.getAllProducts(categories);

    //Scrubbing
    let scrubbedHemkopProducts = [];
    await HemkopScrubber.setDBinfo().then(async () => {
      scrubbedHemkopProducts = await HemkopScrubber.scrubAll(unscrubbedHemkopProducts);
      // writeToFile(
      //   "C:/Users/Denise/Documents/GitHub/FoodHarvest/backend/hemkoptest.txt",
      //   scrubbedHemkopProducts
      // );
    });

    // Posting scrubbed products into db
    FirebaseHandler.postProductsInBatch(scrubbedHemkopProducts);
  }
}
