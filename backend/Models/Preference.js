export class Preference{
  constructor(preferenceName) {

    this.preferenceName = preferenceName;
  }


  static scrubPreferences(storePreferencesArr) {
    let newPreferencesArr = []
   
    console.log('store preferences are ', storePreferencesArr);
    
      for (let j = 0; j < storePreferencesArr.length; j++)
      {
        
        if (storePreferencesArr[j] === "swedish_flag") {
           let preferenceObject = {
             name: "Svensk Flagga",
           };
          newPreferencesArr.push(preferenceObject);
        }
     
        if (storePreferencesArr[j] === "keyhole") {
         
           let preferenceObject = {
             name: "Nyckelhålsmärkt",
           };
          newPreferencesArr.push(preferenceObject);
        }
       
        
        if (storePreferencesArr[j] === "krav") {
          let preferenceObject = {
            name: "KRAV-märkt",
          };
        
          newPreferencesArr.push(preferenceObject);
        }
       if (storePreferencesArr[j] === "ecological") {
           let preferenceObject = {
             name: "Ekologiskt",
           };
        
          newPreferencesArr.push(preferenceObject);
        }
        if (storePreferencesArr[j] === "laktosfree") {
           let preferenceObject = {
             name: "Laktosfritt",
           };
        
          newPreferencesArr.push(preferenceObject);
        }
         if (storePreferencesArr[j] === "fairtrade") {
          let preferenceObject = {
            name: "Fairtrade",
          };
         
          newPreferencesArr.push(preferenceObject);
        }
        if (storePreferencesArr[j] === "glutenfree") {

           let preferenceObject = {
             name: "Glutenfritt",
           };
         
          newPreferencesArr.push(preferenceObject);
         } 
        
        
    }
    if (newPreferencesArr.length != 0) {
       return newPreferencesArr;
    }
    else {
      return null
    }

   
    
  }
}