export class Product{
  constructor(productName, price, quantity, comparisonPrice, brand,
    imageUrl,  category, ean, store, discount, preferences, quantityUnit, comparisonUnit) {
    
 
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
    this.quantityUnit = quantityUnit;
    this.comparisonUnit = comparisonUnit;

    this.comparisonPrice = comparisonPrice;
    this.brand = brand;
    this.imageUrl = imageUrl;
    this.category = category;
    this.preferences = preferences;
    this.ean = ean;
    this.store = store; 
   
    this.discount = discount;
    

  }
}