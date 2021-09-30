import fs from "fs";
import { WillysHarvester } from "./Harvesters/WillysHarvester.js";
import { WillysScrubber } from "./Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "./FirebaseHandler.js";


export class Harvesting {
  static async run() {

    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children; //Getting all BASIC categories of willys

    // write to file for now (goal: write to DB instead)
  
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys

    //Scrubbing all products
    let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys
    );
  
 

//Posting scrubbed products into db
 // FirebaseHandler.postProduct(scrubbedProducts);

   
   
  }
}