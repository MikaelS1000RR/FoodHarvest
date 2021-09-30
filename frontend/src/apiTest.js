
// import _ from 'lodash';

// export const requestQuotes = _.memoize(async product => {
//     console.log("title ", product)
//     const res = await fetch(`https://animechan.vercel.app/api/quotes/anime?title=${product}`)
//     if(res.status !== 200) return [];

//     const quotesArray = await res.json();
//     return quotesArray;
// });

import _ from 'lodash';
import firestore from "./database_config/firestore";

export const requestQuotes = _.memoize(async product => {
    console.log(product)
    const docs = [];
    let snapshot = await firestore
      .collection("products")
      .where("productName", "==", product)
      .get();
    
    snapshot.forEach((doc) => {          
      docs.push({ id: doc.id, ...doc.data() })
      }
    );
    console.log("docs: ", docs)
    return docs;
    
});
