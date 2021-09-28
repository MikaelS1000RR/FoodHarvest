import fs from "fs";
import { WillysHarvester } from "./WillysHarvester.js";
import { WillysScrubber } from "../Scrubbers/WillysScrubber.js";
import { FirebaseHandler } from "../FirebaseHandler.js";


export class TestHarvesting {
  static async test() {

    let rawData = await WillysHarvester.getCategories();
    let categories = rawData.children; //Getting all BASIC categories of willys
  
  

    let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys
  


    //Scrubbing all products
   let scrubbedProducts = await WillysScrubber.scrubAll(
      allProductsOfWillys
    );
  
    writeToFile("scrubbed.json",scrubbedProducts)
 

//Posting scrubbed products into db
 // FirebaseHandler.postProduct(scrubbedProducts);

   
   
  }
}
