import _ from 'lodash';

export const requestProducts = _.memoize(async (search) => {
  let data = {
    searchCodeStart: adaptStringToDbData(search),
    searchCodeEnd: endCodeString(search),
  }
  try {
    let res = await fetch("/rest/products/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data)
    })
    res = await res.json();
    if (res.success && res.products)
    {
      return res.products
    }
  }
  catch {}
  return []
});

function adaptStringToDbData(searchStr) {
  let startString = ""
  const trimSearchStr = searchStr.trim()
  const words = trimSearchStr.split(" ");
  for (let i = 0; i < words.length; i++) {
      // console.log("words[i]: ", words[i])
      if(!words[i][0]){
        startString = " "
        return startString;
      }
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  startString = words.join(" ");
  // console.log(startString)
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


