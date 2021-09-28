import fs from 'fs'
const WillysHarvester from ''./WillysHarvester.js'


export class TestHarvesting {
  static async test() {
    // write to file for now (goal: write to DB instead)
    function writeToFile(fileName, data) {
      fs.writeFileSync(fileName, JSON.stringify(data, null, "  "), "utf-8");
    }

    // let categories = await WillysHarvester.getProducts();
    let frystFagel = await WillysHarvester.getProducts(
      "Kott-chark-och-fagel/Fagel/Fryst-fagel"
      // note we can also fetch all Kott-chark-och-fagel at ONCE!
      // 'Kott-chark-och-fagel'
    );


    

    

    //writeToFile("willys-categories.json", categories);
    //writeToFile("willys-fryst-fagel.json", frystFagel);

    // Test of scrubber
   /* writeToFile(
      "willys-fryst-fagel-scrubbed.json",
      await WillysScrubber.scrubAll(frystFagel)
    );*/

    console.log("Test harvesting and scrubbing done!" + ' ' + JSON.stringify(frystFagel));
  }

};
