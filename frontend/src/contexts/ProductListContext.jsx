import { createContext, useState, useContext, useEffect } from "react";
import firestore from "../database_config/firestore";
import { auth } from "../database_config/firestore";

const ProductListContext = createContext();

export const useProductList = () => {
  return useContext(ProductListContext);
};

const ProductListProvider = (props) => {
  const [currentProductList, setCurrentProductList] = useState(null);
  const [productLists, setProductLists] = useState(null);

  const fetchProductLists = async (userId) => {
    const ref = firestore.collection('product-lists');
    const query = await ref.where('uid', '==', userId).get();
    let data = [];
    query.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()})
    })
    setCurrentProductList(data[0]);
    setProductLists(data);
  }

  const addProductList = async (list) => {
<<<<<<< HEAD
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
    } catch { }
    return false;
  };

  const resetLists = () => {
    setFavoriteList({ products: [], isFavorite: true });
    setCurrentProductList(null);
    setProductLists(null);
  };

  const fetchAllLists = async (userId) => {
    let favorite = await fetchLists(userId, true);
    if (favorite.products) {
      setFavoriteList(favorite);
      let lists = await fetchLists(userId, false);
      setProductLists(lists);
      if (lists.length > 0) {
        console.log("setting current list ", lists[0])
        await setCurrentProductList(lists[0])
      }
    } else {
      console.log("there is no current list");
      createFavoriteList(userId);
      fetchAllLists(userId);
=======
    const newProductList = {
      uid: list.uid,
      name: list.name
>>>>>>> parent of 1250098 (Merge branch 'develop' into feature-mathem-scrubber)
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

  const updateProductToList = async (list, product, toAdd, currentUser) => {
    let data = {
      list: list,
      product: product,
      toAdd: toAdd,
      user: currentUser,
    };
    try {
<<<<<<< HEAD
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
        if (!res.newList.isFavorite) {
          setCurrentProductList(res.newList);
        } else {
          setFavoriteList(res.newList);
        }
        return true;
      }
    } catch { }
    return false;
  };

  const addIsFavorite = (products) => {
    let newProducts = products;
    if (favoriteList) {
      for (let product of newProducts) {
        let isFavorite = !!favoriteList.products.find(
          (p) => p.productCode === product.productCode
        );
        product.isFavorite = isFavorite;
      }
=======
      // using set() at the moment to add product to collection
      const docRef = await firestore.collection('product-lists').doc().set(newProductList);
    }
    catch {
      console.log("adding list failed");
      return false;
>>>>>>> parent of 1250098 (Merge branch 'develop' into feature-mathem-scrubber)
    }
    return newProducts;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user != null) {
        fetchProductLists(user.uid)
      }
      else {
        console.log("user logged out");
        setCurrentProductList(null);
        setProductLists(null);
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
};

export default ProductListProvider;
