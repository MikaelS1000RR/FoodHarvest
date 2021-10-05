import _ from 'lodash';
import firestore from "./database_config/firestore";

export const requestQuotes = _.memoize(async product => {
    console.log(product)

    const docs = [];
    let snapshot = await firestore
      .collection("products")
      .where("productName", ">=", capitalizeTheFirstLetters(product))
      .where("productName", "<", endString(product))
      .limit(15)
      .get();
    
    snapshot.forEach((doc) => {          
      docs.push({ id: doc.id, ...doc.data() })
      }
    );
    console.log("docs: ", docs)
    return docs;
    
});

function capitalizeTheFirstLetters(searchStr) {
  const words = searchStr.split(" ");
  for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  let startString = words.join(" ");
  console.log(startString)
  return startString
}

function endString(searchStr) {
  let strSearch = capitalizeTheFirstLetters(searchStr)
  let strlength = strSearch.length;
  let strFrontCode = strSearch.slice(0, strlength-1);
  let strEndCode = strSearch.slice(strlength-1, strSearch.length);
  let endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
    
  console.log(endCode)
  return endCode
}



