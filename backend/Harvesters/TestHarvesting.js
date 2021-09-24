import fs from "fs";
import { WillysHarvester } from "./WillysHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";
import { HemkopHarvester } from "./HemkopHarvester.js";

export class TestHarvesting {
  static async test() {

    //Willys - 20 categories
    //Hemkop - 19 categories
    //let rawData = await WillysHarvester.getCategories();
    //let categories = rawData.children; //Getting all BASIC categories of willys

    let rawData = await HemkopHarvester.getCategories();
    let categories = rawData.children;
    

    // write to file for now (goal: write to DB instead)
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }



    let allProductsOfHemkopInArr = await HemkopHarvester.getAllProducts(categories)
    let allProductsOfHemkop=allProductsOfHemkopInArr[0]
    writeToFile("hemkop-all-products.json", allProductsOfHemkop)










   // let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys

    // writeToFile("willys-all-products1.json", allProductsOfWillys[0]);  //Write all products to file if needed (it takes kinda long time)


    //Scrubbing all products
  /* let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys[0]
    );*/

//Posting scrubbed products into db
    //FirebaseHandler.postProducts(scrubbedProducts);
  }
}
