import { WillysHarvester } from "../Harvesters/WillysHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";

export class WillysHandler{
  static async run() {
    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children;

    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }
    console.log("Harvesting has started");
    let allProductsOfWillys = await WillysHarvester.getAllProducts(
      categories
    ); //This is all products of Willys

    //Scrubbing all products
    let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys
    );
    console.log("length of products is ", scrubbedProducts.length);

    //Posting scrubbed products into db
    FirebaseHandler.postProduct(scrubbedProducts);
  }
}