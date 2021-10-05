export class Category {
  constructor(categoryName) {
    this.categoryName = categoryName;
  }

  static scrubCategories(storeCategoryName, dbCategories) {
  
    let categoryNames = storeCategoryName.split("&");
    if (categoryNames[1]) {
      categoryNames = [...categoryNames[0].split(","), categoryNames[1]] //Splitting it more
    }
    else {
      categoryNames = [...categoryNames[0].split(",")]
    }

    let foundCategory = false; //Boolean if matching category was found
     
    for (let i = 0; i < dbCategories.length; i++){
      for (let j = 0; j < categoryNames.length; j++){
       
       //smth wrong with skönhet och hälsa? It can't find matching category on its own
        if (categoryNames[j]!=undefined && categoryNames[j].includes("Hälsa")) {
           let newCategory = dbCategories.find(
             (c) => c.name === "Skönhet & Hälsa"
           );
          
          return newCategory;
        }

        //If db category includes any word from store category then matching category was found
        else if (dbCategories[i].name.includes(categoryNames[j]))
        {
          foundCategory = true;
          return dbCategories[i];
        }
      }


    }

    //If matching category was not found we give it category "Övrigt"
    if (!foundCategory) {
     
      let newCategory = dbCategories.find(c => c.name === "Övrigt");
      return newCategory
    }
  }
};
