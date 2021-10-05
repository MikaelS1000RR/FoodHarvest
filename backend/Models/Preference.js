export class Preference{
  constructor(preferenceName) {

    this.preferenceName = preferenceName;
  }



  //Scrub preferences
  static scrubPreferenceIds(storePreferencesArr, dbPreferences) {
    let newPreferencesArr = []
   
 
    
      for (let j = 0; j < storePreferencesArr.length; j++)
      {
        let preferenceObject;
        if (storePreferencesArr[j] === "swedish_flag") {
          preferenceObject = dbPreferences.find(p => p.name === "Svensk Flagga")
        }
     
        else if (storePreferencesArr[j] === "keyhole") {
          preferenceObject = dbPreferences.find((p) => p.name === "Nyckelhålsmärkt");
        }
        
        else if (storePreferencesArr[j] === "krav") {
          preferenceObject = dbPreferences.find((p) => p.name === "KRAV-märkt");
        }
        else if (storePreferencesArr[j] === "ecological") {
          preferenceObject = dbPreferences.find((p) => p.name === "Ekologiskt");
        }
        
        else if (storePreferencesArr[j] === "laktosfree") {
          preferenceObject = dbPreferences.find((p) => p.name === "Laktosfritt");
        }
          
        else if (storePreferencesArr[j] === "fairtrade") {
          preferenceObject = dbPreferences.find((p) => p.name === "Fairtrade");
        }
        
        else if (storePreferencesArr[j] === "glutenfree") {
          preferenceObject = dbPreferences.find((p) => p.name === "Glutenfritt");
        }

        if (preferenceObject && preferenceObject.id) {
          newPreferencesArr.push(preferenceObject.id)
        }
        
        
    }
    if (newPreferencesArr.length != 0) {
       return newPreferencesArr;
    }

    //If none of preferences match, return null
    else {
      return null
    }

   
    
  }
}