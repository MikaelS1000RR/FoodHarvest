const fs = require("fs");
const WillysHarvester = require("./WillysHarvester.js");



module.exports = class TestHarvesting {
  static async test() {
    // write to file for now (goal: write to DB instead)
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    let categories = await WillysHarvester.getProducts();
 



    

    writeToFile("willys-categories.json", categories);
  

    console.log("Test harvesting and scrubbing done!" + ' ' + categories);
  }

};