module.exports = class Product{
  constructor(id, productName, price, quantity, comparisonPrice, brand, storeId,
    imageUrl, category, ean) {
    this.id = id;
    this.categoriesId = categoriesId;

    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
   
    this.comparisonPrice = comparisonPrice;
    this.brand = brand;
    this.storeId = storeId;

    this.imageUrl = imageUrl;
    this.category = category; 
    this.ean = ean;

  }
}