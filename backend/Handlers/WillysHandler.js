import { WillysHarvester } from "../Harvesters/WillysHarvester";
import { WillysScrubber } from "../Scrubbers/WillysScrubber";

export class WillysHandler{
  static async run() {
    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children;

    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

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