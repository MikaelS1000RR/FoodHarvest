module.exports = class ProductList{
  constructor(id, listName, totalPrice, shopName, products) {
    this.id = id;
    this.listName = listName;
    this.totalPrice = totalPrice;
    this.shopName = shopName;
    this.products = products;
  }
}