import fs from "fs";
import { HemkopHarvester } from "../Harvesters/HemkopHarvester.js";
import { HemkopScrubber } from "../Scrubbers/HemkopScrubber.js"
import { FirebaseHandler } from "../FirebaseHandler.js";

export class HemkopHandler {
  static async run() {
    let rawData = await HemkopHarvester.getCategories();
    let categories = rawData.children;

    // Harvesting
    let unscrubbedHemkopProducts = await HemkopHarvester.getAllProducts(categories);

    //Scrubbing
    let scrubbedHemkopProducts = [];
    await HemkopScrubber.setDBinfo().then(async () => {
      scrubbedHemkopProducts = await HemkopScrubber.scrubAll(unscrubbedHemkopProducts);
    });

    // Posting scrubbed products into db
    FirebaseHandler.postProductsInBatch(scrubbedHemkopProducts);
  }
}
