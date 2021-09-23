import fetch from 'node-fetch'
import { Scrubber } from './Scrubber.js'
import { WillysHarvester } from '../Harvesters/WillysHarvester.js'
import { FirebaseHandler } from "../FirebaseHandler.js";
import {Store} from '../Models/Store.js'

export class WillysScrubber extends Scrubber {
  static translateSchema = {
    productName: (x) => x.name,
    price: (x) => x.price,
    quantity: (x) => x.displayVolume,
    comparisonPrice: (x) => x.comparePrice,
    brand: (x) => x.manufacturer,
    imageUrl: (x) => x.thumbnail.url,
    category: (x) => x.category, //scrubb all categories- matspar?
    preferences: (x) => x.labels,
    ean: (x) => this.getEan(x.code),
    store: (x) =>this.getStore(),
    savings: (x) => x.savingsAmount,
    discountType: (x) => x.campaignType,
  };

  static async getEan(productCode) {
    let raw = await fetch(
      "https://www.willys.se/axfood/rest/p/" +
        productCode +
        WillysHarvester.bustCache()
    );
    let formatted = await raw.json();
    return formatted.ean;
  }

  static async getStore() {
    const willysStore = new Store(
      "Willys",
      "https://digitalatjanster.se/wp-content/uploads/2020/04/willys-logo.png"
    );
    return willysStore;
  }
}