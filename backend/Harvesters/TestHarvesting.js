import fs from "fs";
import { WillysHarvester } from "./WillysHarvester.js";
import { MathemHarvester } from "./MathemHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";
import { MathemScrubber } from "../Scrubbers/MathemScrubber.js";

export class TestHarvesting {
  static async test() {

    // let rawData = await WillysHarvester.getCategories();
    // let categories = rawData.children; //Getting all BASIC categories of willys

      // Categories 
      let categories = await MathemHarvester.getCategories();
      // console.log('reached ', categories.length)
    let getProducts = await MathemHarvester.getProductsFromCategories(categories);
      
      // let productsOfMathem = await MathemHarvester.getProducts();
    // let scrubbedMathemProducts = await MathemHarvester.scrubAll(getProducts);
    let scrubbedMathemProducts = await MathemScrubber.scrubAll(getProducts);
    // let scrubbedMathemProducts = [];
    // for (let i = 0; i < getProducts.length; i++){
    //   scrubbedMathemProducts.push(await MathemScrubber.scrubAll([getProducts[i]]))
    // }
    function writeToFile(fileName, data) {
      try {
        fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
        console.log("success");
      } catch (err) {
        console.log(err);
      }
    }
      writeToFile(
        "C:/Users/Jonathan/Documents/GitHub/FoodHarvest/backend/scrubbedMathemProducts.txt", scrubbedMathemProducts
    );
    
   //  let productsOfMathem = await MathemHarvester.getAllProducts(categoriesOfMathem) // Products of Mathem
   
  //  console.log(getProducts);
  
    // let cat = rawMat.children;
  
  // write to file for now (goal: write to DB instead)
  // function writeToFile(fileName, data) {
  //   fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
  // }
  
  //let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys
 // let mathemData = await MathemHarvester.getAllProducts(cat);
  // let allProductsOfMathem = await allProductsOfMathem.getAllProducts(cat);
  //let allProductsOfMathem = await MathemHarvester.overWriteProducts(productsOfMathem)
    
  

    // let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys
  


    //Scrubbing all products
  //  let scrubbedProducts = await WillysScrubber.scrubAll(
  //     allProductsOfWillys
  //   );
 

//     let scrubbedMathemProducts = await MathemScrubber.scrubAll(productsOfMathem[0])
// //Posting scrubbed products into db
    
//     FirebaseHandler.postProducts(scrubbedMathemProducts);
  }
}
