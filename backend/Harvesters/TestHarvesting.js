import fs from 'fs'
import { WillysHarvester } from "./WillysHarvester.js";

export class TestHarvesting {
  static async test() {
    // write to file for now (goal: write to DB instead)

    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    let rawData = await WillysHarvester.getCategories();
   
    let categories = rawData.children; //children of raw data aka all categories inside of array where each category is an object


    let allProductsOfWillys=[]
    for (var i = 0; i < categories.length; i++) {

      let category = categories[i]; //Getting each category
      let productsOfCategory = await WillysHarvester.getProducts(category.url); //Sending url of each basic category to getProducts method
      allProductsOfWillys.push(productsOfCategory) //Pushing all products of all categories into one big array

    }

  writeToFile("willys-all-products.json", allProductsOfWillys);
  }
  }

