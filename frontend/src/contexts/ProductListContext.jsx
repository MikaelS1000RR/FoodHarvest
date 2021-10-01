import { createContext, useState, useContext, useEffect } from "react";
import firestore from "../database_config/firestore";
import { auth } from "../database_config/firestore";

const ProductListContext = createContext();

export const useProductList = () => {
  return useContext(ProductListContext);
};

const ProductListProvider = (props) => {
  const [favoriteList, setFavoriteList] = useState({ products: [] });
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
        fetchAllLists(list.uid);
        return true;
      }
    } catch {}
    return false;
  };

  const fetchAllLists = async (userId) => {
    let favorite = await fetchLists(userId, true);
    if (favorite.products) {
      setFavoriteList(favorite);
      let lists = await fetchLists(userId, false);
      setProductLists(lists);
      if (lists.length > 0) {
        setCurrentProductList(lists[0])
      }
    } else {
      createFavoriteList(userId);
      fetchAllLists(userId);
    }
  };

  const fetchLists = async (userId, isFavorite) => {
    const snapshot = await firestore
      .collection("product-lists")
      .where("uid", "==", userId)
      .where("isFavorite", "==", isFavorite)
      .get();
    let lists = [];
    snapshot.forEach((doc) => {
      if (isFavorite) {
        lists = { id: doc.id, ...doc.data() };
        return;
      }
      lists.push({ id: doc.id, ...doc.data() });
    });
    return lists;
  };

  const createFavoriteList = async (userId) => {
    let newFavoriteList = {
      uid: userId,
      name: "Favorite",
      isFavorite: true,
    };
    addProductList(newFavoriteList);
  };

  const updateProductToFavorite = async (product, toAdd, currentUser) => {
    let data = {
      list: favoriteList,
      product: product,
      toAdd: toAdd,
      user: currentUser,
    };
    try {
      let res = await fetch("/api/product-list", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      res = await res.json();
      if (res.success) {
        setFavoriteList(res.newList);
        return true;
      }
    } catch {}
    return false;
  };

  const updateProductToCurrentList = async (product, toAdd, currentUser) => {
    let data = {
      list: currentProductList,
      product: product,
      toAdd: toAdd,
      user: currentUser
    };
    let res = await fetch("/api/product-list/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    console.log(res);
    if (res.success) {
      setCurrentProductList(res.newList);
      return true;
    }
    return false;
  };

  const addIsFavorite = (products) => {
    let favorites = favoriteList;
    for (let product of products) {
      let isFavorite = !!favorites.products.find((p) => p === product.id);
      product.isFavorite = isFavorite;
    }
    return products;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user != null) {
        fetchAllLists(user.uid);
      } else {
        setCurrentProductList(null);
        setProductLists(null);
        setFavoriteList({ products: [] });
      }
    });
    return unsubscribe;
  }, []);

  const values = {
    favoriteList,
    currentProductList,
    setCurrentProductList,
    productLists,
    fetchAllLists,
    addProductList,
    updateProductToFavorite,
    updateProductToCurrentList,
    addIsFavorite,
  };

  return (
    <ProductListContext.Provider value={values}>
      {props.children}
    </ProductListContext.Provider>
  );
};

export default ProductListProvider;
