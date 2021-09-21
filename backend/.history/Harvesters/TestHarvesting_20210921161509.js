
import { WillysHarvester } from './WillysHarvester.js'


export class TestHarvesting {
  static async test() {
    // write to file for now (goal: write to DB instead)
  

    // let categories = await WillysHarvester.getProducts();
    let frystFagel = await WillysHarvester.getProducts(
      "Kott-chark-och-fagel/Fagel/Fryst-fagel"
      // note we can also fetch all Kott-chark-och-fagel at ONCE!
      // 'Kott-chark-och-fagel'
    );


    
    console.log("Test harvesting and scrubbing done!" + ' ' + JSON.stringify(frystFagel));
  }

};
