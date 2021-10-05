import _ from 'lodash';
import firestore from "./database_config/firestore";

export const requestProducts = _.memoize(async productNameSearch => {
    console.log(productNameSearch)

    const docs = [];
    let snapshot = await firestore
      .collection("products")
      .where("productName", ">=", adaptStringToDbData(productNameSearch))
      .where("productName", "<", endCodeString(productNameSearch))
      .limit(15)
      .get();
    
    snapshot.forEach((doc) => {          
      docs.push({ id: doc.id, ...doc.data() })
      }
    );
    console.log("docs: ", docs)
    return docs;
    
});

function adaptStringToDbData(searchStr) {
  let startString = ""
  const trimSearchStr = searchStr.trim()
  const words = trimSearchStr.split(" ");
  for (let i = 0; i < words.length; i++) {
      console.log("words[i]: ", words[i])
      if(!words[i][0]){
        startString = " "
        return startString;
      }
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  startString = words.join(" ");
  console.log(startString)
  return startString
}

function endCodeString(searchStr) {
  let strSearch = adaptStringToDbData(searchStr)
  let strlength = adaptStringToDbData(searchStr).length;
  let strFrontCode = strSearch.slice(0, strlength-1);
  let strEndCode = strSearch.slice(strlength-1, strSearch.length);
  let endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
    
  console.log(endCode)
  return endCode
}



