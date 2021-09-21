const fetch = require('node-fetch');


module.exports = class WillysHarvester {
  static bustCache() {
    return "?avoidCache=" + (Math.random() + "").split(".")[1];
  }
  static async getCategories() {
    let raw = await fetch('https://www.willys.se/leftMenu/categorytree'
      + this.bustCache());
    return await raw.json();
  }


};
