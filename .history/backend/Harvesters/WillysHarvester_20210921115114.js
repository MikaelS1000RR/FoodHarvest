const fetch = require('node-fetch');


module.exports = class WillysHarvester {
  static bustCache() {
    return "?avoidCache=" + (Math.random() + "").split(".")[1];
  }
  static async getCategories() {
    const result = а
      .get("https://www.willys.se/leftMenu/categorytree")
      .then(function (response) {
     
        console.log(response.data);
      });
    return await result.json();
    //let raw = await fetch("https://www.willys.se/leftMenu/categorytree");

    //return await raw.json();
  }


};
