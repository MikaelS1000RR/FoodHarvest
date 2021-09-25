export class Category {
  constructor( categoryName) {
    this.categoryName = categoryName;
  }

  static scrubCategories(storeCategoryName, dbCategories) {
  
    wordArr = storeCategoryName.split("&");
    for (let i = 0; i < dbCategories.length; i++){
      for (let j = 0; j < wordArr.length; j++){
        if (dbCategories[i].name.includes(wordArr[j]))
        {
          let newCategory = {
            name: dbCategories[i].name
          }
          console.log('returning ', newCategory);
          return newCategory
        }
        else {
          let newCategory = {
            name: "Övrigt"
          }
          console.log('returning övrigt');
          return newCategory
        }
      }
      
        
    }
  }
};
