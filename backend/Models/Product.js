export class Product{
  constructor(productName, price, quantity, comparisonPrice, brand,
    imageUrl,  category, ean, store, savings, discountType, preferences) {
    
 
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
    this.comparisonPrice = comparisonPrice;
    this.brand = brand;
    this.imageUrl = imageUrl;
    this.category = category; 
    this.ean = ean;
    this.store = store; 
    this.savings = savings;
    this.discountType = discountType;
    this.preferences = preferences;

  }
}