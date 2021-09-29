import { FirebaseHandler } from "../FirebaseHandler.js";


export class Preference{
  constructor(preferenceName) {

    this.preferenceName = preferenceName;
  }
  //Scrub preferences
  static scrubPreferences(storePreferencesArr) {
    //returns array of preferences from db
    let preferencesFromDb=FirebaseHandler.getPreferences()
    let newPreferencesArr = []

      for (let j = 0; j < storePreferencesArr.length; j++)
      {
        
        if (storePreferencesArr[j] === "swedish_flag") {
        
           let newPreference = preferencesFromDb.find(
             (preference) => preference.name == "Svensk Flagga"
           );
          newPreferencesArr.push(newPreference.ref);
        }
     
        if (storePreferencesArr[j] === "keyhole") {
         
         

            let newPreference = preferencesFromDb.find(
              (preference) => preference.name == "Nyckelhålsmärkt"
            );
            newPreferencesArr.push(newPreference.ref);
        }
       
        
        if (storePreferencesArr[j] === "krav") {
         
            let newPreference = preferencesFromDb.find(
              (preference) => preference.name == "KRAV-märkt"
            );
            newPreferencesArr.push(newPreference.ref);


        }
       if (storePreferencesArr[j] === "ecological") {
           
         
          
            let newPreference = preferencesFromDb.find(
              (preference) => preference.name == "Ekologiskt"
            );
            newPreferencesArr.push(newPreference.ref);


        }
        if (storePreferencesArr[j] === "laktosfree") {
        
           let newPreference = preferencesFromDb.find(
             (preference) => preference.name == "Laktosfritt"
           );
           newPreferencesArr.push(newPreference.ref);
        }
         if (storePreferencesArr[j] === "fairtrade") {
         
           
           let newPreference = preferencesFromDb.find(
             (preference) => preference.name == "Fairtrade"
           );
           newPreferencesArr.push(newPreference.ref);
        }
        if (storePreferencesArr[j] === "glutenfree") {

      
           let newPreference = preferencesFromDb.find(
             (preference) => preference.name == "Glutenfritt"
           );
           newPreferencesArr.push(newPreference.ref);
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