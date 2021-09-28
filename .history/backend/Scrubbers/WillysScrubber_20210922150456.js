import fetch from 'node-fetch'
import { Scrubber } from './Scrubber'

export class WillyScrabber extends Scrubber {
    static translateSchema = {
       
        // productName: x => x.name,
        // brand: x => x.manufacturer,
        // imageUrl: x => x.image && x.image.url,
        // price: x => x.price,
        // unitVolume: x => parseFloat(x.displayVolume.replace(/,/, '.')),
        // unitMeasurement: x => x.displayVolume.replace(/[0-9\.]/g, ''),
        // comparePrice: x => parseFloat(x.comparePrice.replace(/,/, '.')),
        // compareMeasurement: x => x.comparePriceUnit,
        // inStock: x => !x.outOfStock,
        // frozen: x => x.labels.includes('frozen'),
        // ecological: x => x.labels.includes('ecological'),
        // Swedish: x => x.labels.includes('swedish_flag'),
        // countryOfOrigin: async x => {
        //   // Seems we need detailed product info for this...
        //   // (one fetch per product - lots of extra time :( )
        //   // maybe ask productOwner if Swedish/non Swedish enough?
        //   let rawData = await fetch('https://www.willys.se/axfood/rest/p/' + x.code);
        //   let data = await rawData.json();
        //   return data.originCountry || data.tradeItemCountryOfOrigin
        // }

        productName: x => x.name,
        price: x => x.price,
        quantity

    }
}