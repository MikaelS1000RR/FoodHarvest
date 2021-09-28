import fetch from 'node-fetch'
import { Scrubber } from './Scrubber.js'
import { WillysHarvester } from '../Harvesters/WillysHarvester.js'
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Store } from '../Models/Store.js'
import { Preference } from "../Models/Preference.js"
import { Discount } from '../Models/Discount.js';

export class MathemScrubber extends Scrubber {
    static translateSchema = {
        productName: (x) => x.name,
        price: (x) => x.price,
        quantity: (x) => x.quantity,
        quantityUnit: (x) => x.unit,
        comparisonUnit: (x) => x.comparisonUnit,
        comparisonPrice: (x) => x.comparisonPrice,
        brand: (x) => x.brand,
        imageUrl: (x) => x. 
    }
}