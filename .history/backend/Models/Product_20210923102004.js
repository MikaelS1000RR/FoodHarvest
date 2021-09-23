module.exports = class Product{
  constructor(id, categoriesId, productName, price, quantity, quantityUnit, comparisonUnit, comparisonPrice, brand, storeId,
    discountId, imageUrl, category, ean) {
    this.id = id;
    this.categoriesId = categoriesId;

    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
    this.quantityUnit = quantityUnit;
    this.comparisonUnit = comparisonUnit;
    this.comparisonPrice = comparisonPrice;
    this.brand = brand;
    this.storeId = storeId;
    this.discountId = discountId;
    this.imageUrl = imageUrl;
    this.category = category; 
    this.ean = ean;

  }
}