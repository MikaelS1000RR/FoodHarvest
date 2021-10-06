import { MathemHarvester } from "../Harvesters/MathemHarvester.js";
import { MathemScrubber } from "../Scrubbers/MathemScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";

export class MathemHandler {
  static async run(collection, productsPerCategory) {
    const size = productsPerCategory || 2;
    // Categories 
    MathemScrubber.getInformationFromDb();

    //Harvesting
    let mathemsCategories = await MathemHarvester.getCategories();
    let getMathemsProducts = await MathemHarvester.getProductsFromCategories(
      mathemsCategories,
      size
    );

    //Scrubbing
    let scrubbedMathemProducts = await MathemScrubber.scrubAll(getMathemsProducts);

    //Posting
    FirebaseHandler.postProduct(collection, scrubbedMathemProducts);

  }
}