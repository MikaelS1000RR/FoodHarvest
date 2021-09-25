import fs from "fs";
import { WillysHarvester } from "./WillysHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";


export class TestHarvesting {
  static async test() {

    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children; //Getting all BASIC categories of willys

    // write to file for now (goal: write to DB instead)
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys

    //writeToFile("willys-all-products1.json", allProductsOfWillys);  //Write all products to file if needed (it takes kinda long time)


    //Scrubbing all products
   let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys
    );

    writeToFile("willys-all-products1.json", scrubbedProducts);

//Posting scrubbed products into db
    //FirebaseHandler.postProducts(scrubbedProducts);
  }
}
