
import firestore from "../db_config_frontend/firestore";


export class FirebaseHandler {
 static  getStoresFirestore = () => {
 
  // Use firestore to listen for changes within collection
 
    firestore.collection("stores").onSnapshot(
      (snapshot) => {
        // Loop through the snapshot and collect
        // the necessary info we need. Then push
        // it into our array
        const allStores = [];
        snapshot.forEach((doc) => allStores.push(doc.data()));
        return allStores;
      },
      (error) => console.error(error)
    );
  

 


};
}


