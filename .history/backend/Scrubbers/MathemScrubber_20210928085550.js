import fetch from 'node-fetch'
import { Scrubber } from './Scrubber.js'
import { WillysHarvester } from '../Harvesters/WillysHarvester.js'
import { FirebaseHandler } from "../FirebaseHandler.js";
import { Store } from '../Models/Store.js'
import { Preference } from "../Models/Preference.js"
import { Discount } from '../Models/Discount.js';
import { MathemHarvester } from '../Harvesters/MathemHarvester.js';

export class MathemScrubber extends Scrubber {
    static translateSchema = {
        productName: (x) => x.name,
        price: (x) => x.price,
        quantity: (x) => x.quantity,
        quantityUnit: (x) => x.unit,
        comparisonUnit: (x) => x.comparisonUnit,
        comparisonPrice: (x) => x.comparisonPrice,
        brand: (x) => x.brand,
        imageUrl: (x) => x.images,
        category: (x) => x.category,
        preferences: (x) => x.preferences,
        ean: (x) => x.this
    }

    static async getEan(productCode) {
        let raw = await fetch(
            "https://api.mathem.io/product-search/noauth/search/query?size=1003&index=0&storeId=10&searchType=recommended" 
            + productCode + MathemHarvester.bustCache()
        );
        let formatted = await raw.json();
        return formatted.ean; 
    }
}