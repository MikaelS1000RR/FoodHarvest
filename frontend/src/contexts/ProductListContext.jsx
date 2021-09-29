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
    const newProductList = {
      uid: list.uid,
      name: list.name
    }
    try {
      let res = fetch("/api/product-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(list)
      });
      res = await res.json();
      console.log(res);
    }
    catch {
      console.log("adding list failed");
      return false;
    }
    fetchProductLists(newProductList.uid);
    return true;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user != null) {
        fetchProductLists(user.uid)
      }
      else {
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
}
 
export default ProductListProvider;