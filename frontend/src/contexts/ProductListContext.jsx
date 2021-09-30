import { createContext, useState, useContext, useEffect } from "react";
import firestore from "../database_config/firestore";
import { auth } from "../database_config/firestore"

const ProductListContext = createContext();

export const useProductList = () => {
  return useContext(ProductListContext);
};

const ProductListProvider = (props) => {
  const [favoriteList, setFavoriteList] = useState([])
  const [currentProductList, setCurrentProductList] = useState(null);
  const [productLists, setProductLists] = useState(null);

  const addProductList = async (list) => {
    try {
      let res = await fetch("/api/product-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(list),
      });
      res = await res.json();
      if (res.success) {
        fetchProductLists(list.uid);
        return true;
      }
    } catch {
      console.log("adding list failed");
    }
    return false;
  };

  const fetchProductLists = async (userId) => {
    const snapshot = await firestore
      .collection("product-lists")
      .where("uid", "==", userId)
      .get();
    let lists = [];
    snapshot.forEach((doc) => {
      lists.push({id: doc.id, ...doc.data()})
    })
    filterListsAndCreateFavorite(lists, userId)
  }

  const filterListsAndCreateFavorite = (lists, uid) => {
    let favoriteList = lists.find((list) => list.isFavorite === true);
    if (favoriteList) {
      setFavoriteList(favoriteList);
    }
    else {
      let newFavoriteList = {
        uid: uid,
        name: "Favorite",
        isFavorite: true,
      }
      addProductList(newFavoriteList);
      return;
    }
    let productLists = lists.filter((list) => list.isFavorite === false);
    setProductLists(productLists);
    if (productLists.length > 0) {
      setCurrentProductList(productLists[0]);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user != null) {
        console.log("User hittad och vi hämtar listor");
        fetchProductLists(user.uid)
      }
      else {
        setCurrentProductList(null);
        setProductLists(null);
        setFavoriteList({products:[]})
      }
    });
    return unsubscribe;
  }, []);

  const values = {
    favoriteList,
    currentProductList,
    setCurrentProductList,
    productLists,
    fetchProductLists,
    addProductList
  }

  return (
    <ProductListContext.Provider value={values}>
      {props.children}
    </ProductListContext.Provider>
  );
}
 
export default ProductListProvider;