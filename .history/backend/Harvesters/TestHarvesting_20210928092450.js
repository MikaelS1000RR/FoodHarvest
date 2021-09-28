import fs from "fs";
import { WillysHarvester } from "./WillysHarvester.js";
import { MathemHarvester } from "./MathemHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";
import { MathemScrubber } from "../Scrubbers/MathemScrubber.js";

export class TestHarvesting {
  static async test() {

    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children; //Getting all BASIC categories of willys

      let rawDataMathem = await MathemHarvester.getCategories();
      let categoriesOfMathem = await rawDataMathem.products; // Mathem Categories
      
      // let productsOfMathem = await MathemHarvester.getProducts();
     
    
   //  let productsOfMathem = await MathemHarvester.getAllProducts(categoriesOfMathem) // Products of Mathem
   
  
    // let cat = rawMat.children;
  
  // write to file for now (goal: write to DB instead)
  function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
  }
  
  let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys
 // let mathemData = await MathemHarvester.getAllProducts(cat);
  // let allProductsOfMathem = await allProductsOfMathem.getAllProducts(cat);
  let allProductsOfMathem = await MathemHarvester.getAllProducts(categoriesOfMathem)
    
   console.log(allProductsOfMathem);
  


    // writeToFile("willys-all-products1.json", allProductsOfWillys[0]);  //Write all products to file if needed (it takes kinda long time)


    //Scrubbing all products
   let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys[0]
    );

    let scrubbedMathemProducts = await MathemScrubber.scrubAll(allProductsOfMathem[0])
//Posting scrubbed products into db
    FirebaseHandler.postProducts(scrubbedProducts);
  }
}
