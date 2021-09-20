 module.exports = class User {
  constructor(name, email, password, productLists, favoriteList) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.productLists = productLists;
      this.favoriteList = favoriteList;
  }
}

