import _ from 'lodash';
import firestore from "./database_config/firestore";

export const requestQuotes = _.memoize(async product => {
    console.log(product)

    const docs = [];
    let snapshot = await firestore
      .collection("products")
      .where("productName", "==", capitalizeFirstLetter(product))
      .get();
    
    snapshot.forEach((doc) => {          
      docs.push({ id: doc.id, ...doc.data() })
      }
    );
    console.log("docs: ", docs)
    return docs;
    
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


