import fetch from 'node-fetch'

export class WillysHarvester {
  static bustCache() {
    return "?avoidCache=" + (Math.random() + "").split(".")[1];
  }

  //Getting all basic categories in Willys
  static async getCategories() {
    let raw = await fetch(
      "https://www.willys.se/leftMenu/categorytree" + this.bustCache()
    );
    return await raw.json();
  }

  //Getting products in one specific category
  static async getProducts(categoryURL) {
    let raw = await fetch(
      "https://www.willys.se/c/" +
        categoryURL +
        this.bustCache() +
        "&size=10000"
    );
    return (await raw.json()).results;
  }

  //Getting all products from all categories
  static async getAllProducts(categories) {
    let allProductsOfWillys = [];

    for (var i = 0; i < categories.length; i++) {
      let category = categories[i]; //Getting each category
      let productsOfCategory = await this.getProducts(category.url);
      allProductsOfWillys.push(productsOfCategory);
    }
    return allProductsOfWillys;
  }

}
