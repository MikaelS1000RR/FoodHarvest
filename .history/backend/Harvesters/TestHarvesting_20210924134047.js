import fs from "fs";
import { WillysHarvester } from "./WillysHarvester.js";
import { MathemHarvester } from "./MathemHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";


export class TestHarvesting {
  static async test() {

    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children; //Getting all BASIC categories of willys
    let mathemRawData = await MathemHarvester.getCategories();
    let mathemCategories = mathemRawData.category;

    

    // write to file for now (goal: write to DB instead)
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys
    let allCategoriesOfMathem = aw
    
    console.log(mathemCategories)

    console.log(allCategoriesOfMathem)

    // writeToFile("willys-all-products1.json", allProductsOfWillys[0]);  //Write all products to file if needed (it takes kinda long time)


    //Scrubbing all products
   let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys[0]
    );

//Posting scrubbed products into db
    FirebaseHandler.postProducts(scrubbedProducts);
  }
}
