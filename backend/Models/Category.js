export class Category {
  constructor( categoryName) {
    this.categoryName = categoryName;
  }

  static scrubCategories(storeCategoryName, dbCategories) {
  
    let wordArr = storeCategoryName.split("&"); //Splitting category
    let wordArr2 = wordArr[0].split(",") //Splitting it more
    let wordArr3 = [wordArr[wordArr.length - 1], wordArr2[0], wordArr2[1]] //We'll have max different 3 words to compare with
    


    let foundCategory = false; //Boolean if matching category was found
     
    for (let i = 0; i < dbCategories.length; i++){
      for (let j = 0; j < wordArr3.length; j++){
       
       //smth wrong with skönhet och hälsa? It can't find matching category on its own
        if (wordArr3[j]!=undefined && wordArr3[j].includes("Hälsa")) {
           let newCategory = {
             name: "Skönhet & Hälsa",
           };
          foundCategory = true;
          return newCategory;
        }

        //If db category includes any word from store category then matching category was found
        else if (dbCategories[i].name.includes(wordArr3[j]))
        {
        let newCategory = {
          name: dbCategories[i].name,
        };
          foundCategory = true;
          return newCategory
        }
      }
      //
        
    }

    //If matching category was not found we give it category "Övrigt"
    if (!foundCategory) {
     
      let newCategory = {
        name: "Övrigt"
      }
      return newCategory
    }
  }
};
