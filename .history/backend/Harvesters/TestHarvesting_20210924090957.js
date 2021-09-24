import fs from "fs";
import { WillysHarvester } from "./WillysHarvester.js";
import { MathemHarvester } from "./MathemHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";


export class TestHarvesting {
  static async test() {




   
    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children; //Getting all BASIC categories of willys

    // write to file for now (goal: write to DB instead)
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys
    let allProductsOfMathem = await MathemHarvester.getProducts();

    console.log(all)

    // writeToFile("willys-all-products1.json", allProductsOfWillys[0]);  //Write all products to file if needed (it takes kinda long time)

    let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys[0]
    );
    //This will be saved in databse later
    //writeToFile("willys-scrubbed-products", scrubbedProducts);

    writeToFile("willys-all-scrubbed-products.json", scrubbedProducts);
  }
}
