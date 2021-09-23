import fs from 'fs'
import { WillysHarvester } from "./WillysHarvester.js";
import { WillysScrabber } from "../Scrubbers/WillysScrubber.js";

export class TestHarvesting {
  static async test() {
    
    let rawData = await WillysHarvester.getCategories();
    let rawProduct = await WillysScrabber.getEan("101283860_KG");
   
    let categories = rawData.children; //Getting all BASIC categories of willys
    console.log('ean  is', rawProduct.ean);

    // write to file for now (goal: write to DB instead)
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }
    
    let allProductsOfWillys = await WillysHarvester.getAllProducts(categories); //This is all products of Willys
    // writeToFile("willys-all-products.json", allProductsOfWillys);  //Write all products to file if needed (it takes kinda long time)

    


    
  }

  
  }

