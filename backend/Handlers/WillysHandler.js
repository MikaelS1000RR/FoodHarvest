import { WillysHarvester } from "../Harvesters/WillysHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";

export class WillysHandler {
  static async run(collection, productPerCategory) {
    const size = productPerCategory || 2;
    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children;

    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }
    let allProductsOfWillys = await WillysHarvester.getAllProducts(
      categories,
      size
    ); //This is all products of Willys

    //Scrubbing all products
    let scrubbedProducts = [];
    await WillysScrubber.setDBinfo().then(async () => {
      scrubbedProducts = await WillysScrubber.scrubAll(allProductsOfWillys);
    });

    //Posting scrubbed products into db
    FirebaseHandler.postProduct(collection, scrubbedProducts);
  }
}