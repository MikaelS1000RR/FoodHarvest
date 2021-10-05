import _ from 'lodash';

export const requestQuotes = _.memoize(async (search, options) => {
  let data = {
    search: capitalizeFirstLetter(search),
    favoriteList: options.favoriteList,
    currentList: options.currentList
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
    console.log(res);
    if (res.success && res.products)
    {
      return res.products
    }
  }
  catch {}
  return []
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


