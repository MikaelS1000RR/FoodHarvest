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
  

    let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys
  


    //Scrubbing all products
   let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys
    );
 

    let scrubbedMathemProducts = await MathemScrubber.scrubAll(categoriesOfMathem[0])
//Posting scrubbed products into db
    FirebaseHandler.postProducts(scrubbedProducts, scrubbedMathemProducts);
  }
}
