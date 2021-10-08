import { HemkopHarvester } from "../Harvesters/HemkopHarvester.js";
import { HemkopScrubber } from "../Scrubbers/HemkopScrubber.js"
import { FirebaseHandler } from "../FirebaseHandler.js";

export class HemkopHandler {
  static async run(collection, productPerCategory) {
    const size = productPerCategory || 2;
    let rawData = await HemkopHarvester.getCategories();
    let categories = rawData.children;

    // Harvesting
    let unscrubbedHemkopProducts = await HemkopHarvester.getAllProducts(
      categories,
      size
    );
    console.log("Harvesting of Hemkop is done!");

    //Scrubbing
    let scrubbedHemkopProducts = [];
    await HemkopScrubber.setDBinfo().then(async () => {
      scrubbedHemkopProducts = await HemkopScrubber.scrubAll(unscrubbedHemkopProducts);
    });

    // Posting scrubbed products into db
    FirebaseHandler.postProductsInBatch(collection, scrubbedHemkopProducts);
  }
}
