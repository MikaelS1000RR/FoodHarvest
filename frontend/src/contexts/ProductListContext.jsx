import { createContext, useState, useContext, useEffect } from "react";
import firestore from "../database_config/firestore";
import { auth } from "../database_config/firestore";

const ProductListContext = createContext();

export const useProductList = () => {
  return useContext(ProductListContext);
};

const ProductListProvider = (props) => {
  const [favoriteList, setFavoriteList] = useState({
    products: [],
    isFavorite: true,
  });
  const [currentProductList, setCurrentProductList] = useState(null);
  const [productLists, setProductLists] = useState(null);
  const [hemkopTotalPrice, setHemkopTotalPrice] = useState(0)
  const [willysTotalPrice, setWillysTotalPrice] = useState(0)
  const [productNotFound, setProductNotFound]= useState([])

  const fetchProductLists = async (userId) => {
    const ref = firestore.collection("product-lists");
    const query = await ref.where("uid", "==", userId).get();
    let data = [];

    query.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setCurrentProductList(data[0]);
    setProductLists(data);
    console.log(data);
    return data;
  };

  const fetchListById = async (listId) => {
    const ref = await firestore.collection("product-lists").doc(listId).get();
    let data = ref.data();

    return data;
  };

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
    } catch { }
    return false;
  };

  const resetLists = () => {
    setFavoriteList({ products: [], isFavorite: true });
    setCurrentProductList(null);
    setProductLists(null);
  };

  const getTotalPriceOfProducts = async (list) => {
    let hemkopPrices = 0
   let willysPrices=0
    let hemkopProducts = []
    let willysProducts=[]
   
    
   
      for (let product of list.products) {
         let productCodeWithoutStoreName = product.productCode.substring(0, 12);
        let hemkopProductCode = productCodeWithoutStoreName + "hemkop";
        let willysProductCode = productCodeWithoutStoreName + "willys"
        

         //Hemkop
        let snapshot = await firestore
           .collection("test-products-hemkop") //Change this to "products" later
           .where("productCode", "==", hemkopProductCode)
           .limit(1)
           .get();
        snapshot.forEach((doc) => {
         
          hemkopProducts.push(doc.data())
          let stringPrice = doc.data().price;
          hemkopPrices += parseFloat(stringPrice);
         
        });
        


      //Willys
        let snapshot2 = await firestore
           .collection("products") //Change this to "products" later
           .where("productCode", "==", willysProductCode)
           .limit(1)
           .get();
        snapshot2.forEach((doc) => {
         
          willysProducts.push(doc.data())
          let stringPrice = doc.data().price;
          willysPrices += parseFloat(stringPrice);
         });
    }


  

    

    //If products were not found
    if (hemkopProducts.length < list.products.length) {
      console.log("products not found")
      setProductNotFound(...productNotFound, "h")
    }
    if (willysProducts.length < list.products.length) {
      setProductNotFound(...productNotFound, "w")
    }
   
     
    setHemkopTotalPrice(hemkopPrices + " kr");
    
  setWillysTotalPrice(willysPrices + " kr")
    
     
   
 }

  const fetchAllLists = async (userId) => {
   
    let favorite = await fetchLists(userId, true);
    if (favorite.products) {
      
      setFavoriteList(favorite);
      let lists = await fetchLists(userId, false);
      setProductLists(lists);
      if (lists.length > 0) {
        setCurrentProductList(lists[0]);
        console.log("setting current list ", lists[0])
      
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

  const updateProductToList = async (list, product, toAdd, currentUser) => {
    let data = {
      list: list,
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
    }
    return newProducts;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (user) => {
      if (user != null) {
        await fetchAllLists(user.uid);
      
       
       
       
      } else {
        resetLists();
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
    updateProductToList,
    addIsFavorite,
    resetLists,
    hemkopTotalPrice,
    getTotalPriceOfProducts,
    fetchProductLists,
    fetchListById,
    willysTotalPrice,
    productNotFound,
  };

  return (
    <ProductListContext.Provider value={values}>
      {props.children}
    </ProductListContext.Provider>
  );
};

export default ProductListProvider;
