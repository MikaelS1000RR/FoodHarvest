module.exports = class Product{
  constructor(id, productName, price, quantity, comparisonPrice, brand,
    imageUrl,  category, ean, savings, discountType) {
    this.id = id;
    

    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
   
    this.comparisonPrice = comparisonPrice;
    this.brand = brand;


    this.imageUrl = imageUrl;
    this.category = category; 
    this.ean = ean;
    this.savings = savings;
    this.discountType = discountType; 

  }
}