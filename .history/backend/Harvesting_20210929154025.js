import fs from "fs";
import { WillysHarvester } from "./Harvesters/WillysHarvester.js";
import { WillysScrubber } from "./Scrubbers/WillysScrubber.js";
import { MathemHarvester } from "./MathemHarvester.js";
import { MathemScrubber } from "../Scrubbers/MathemScrubber.js";
import { FirebaseHandler } from "./FirebaseHandler.js";


export class Harvesting {
  static async run() {
    //Deleting collection before posting anything
    await FirebaseHandler.deleteCollection("products");

    //Getting all BASIC categories of willys
    // let rawData = await WillysHarvester.getCategories();
    // let categories = rawData.children;

    // let categories = await MathemHarvester.getCategories();
    //   console.log('reached ', categories)
    //   let getProducts = await MathemHarvester.getProductsFromCategories([categories[0]]);
      
    //   console.log(getProducts);
 
    let categories = await MathemHarvester.getCategories();
    let products = await MathemHarvester.getProducts(ca);


    // function writeToFile(fileName, data) {
    //   fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    // }

    // let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys

    // //Scrubbing all products
    // let scrubbedProducts = await WillysScrubber.scrubAll(allProductsOfWillys);
    // console.log('length of products is ', scrubbedProducts.length);

    // //Posting scrubbed products into db
    // FirebaseHandler.postProduct(scrubbedProducts);
  }


}
