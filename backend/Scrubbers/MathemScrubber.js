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
    brand: (x) => x.supplier.name,
    imageUrl: (x) => x.images.SMALL,
    category: (x) => x.category,
    //preferences: (x) => x.preferences,
    ean: (x) => x.gtin,
    store: (x) => x.shops[0].name[0].toUpperCase() + x.shops[0].name.slice(1),
    discount: (x) => this.getDiscount(x),
  };

  static async getDiscount(product) {
    if (product.discount != null) {
      let discount = new Discount(
        product.discount.discountType,
        product.discount.quantityToBeBought,
        product.price,
        product.discount.savings,
        product.discount.percentageSavings,
        product.discount.allowedMemberTypes === null ? false : true
      );
      return discount;
    } else {
      return null;
    }
  }
}