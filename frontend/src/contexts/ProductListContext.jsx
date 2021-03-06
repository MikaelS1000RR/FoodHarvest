import { createContext, useState, useContext, useEffect } from "react";
import firestore from "../database_config/firestore";
import { auth } from "../database_config/firestore";

const ProductListContext = createContext();

export const useProductList = () => {
  return useContext(ProductListContext);
};

const ProductListProvider = (props) => {
  const [favoriteList, setFavoriteList] = useState({ products: [], isFavorite: true });
  const [currentProductList, setCurrentProductList] = useState(null);
  const [productLists, setProductLists] = useState(null);
  const [hemkopTotalPrice, setHemkopTotalPrice] = useState(0)
  const [willysTotalPrice, setWillysTotalPrice] = useState(0)
  const [mathemTotalPrice, setMathemTotalPrice] = useState(0)
  const [productsNotFound, setProductsNotFound]=useState([])
  
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
    
    setFavoriteList({
      products: [],
      isFavorite: true,
    });
    setCurrentProductList(null);
    setProductLists(null);
  };

  const getTotalPriceOfProducts = async (list) => {
    //setNotFound...
    let hemkopPrices = 0
    let willysPrices = 0
    let mathemPrices=0
    let hemkopProductsArr = []
    let willysProductsArr = []
    let mathemProductsArr = []
    let productsNotFoundArr=[]
   
    
    for (let product of list.products) {
      if (product.productCode !== undefined) {

        if (product.productCode.includes("Mathem")) {
         
             let snapshot = await firestore
               .collection("products") //Change this to "products" later
               .where("productCode", "==", product.productCode)
               .limit(1)
               .get();
             snapshot.forEach((doc) => {
              mathemProductsArr.push(doc.data())
               let stringPrice = doc.data().price;
               mathemPrices += parseInt(stringPrice);

             });
        }
        
        else {
          
               let productCodeWithoutStoreName = product.productCode.substring(
                 0,
                 12
               );
               let hemkopProductCode = productCodeWithoutStoreName + "hemkop";
               let willysProductCode = productCodeWithoutStoreName + "willys";

               //Hemkop
               let snapshot = await firestore
                 .collection("products") //Change this to "products" later
                 .where("productCode", "==", hemkopProductCode)
                 .limit(1)
                 .get();
               snapshot.forEach((doc) => {
                 hemkopProductsArr.push(doc.data());
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
                 willysProductsArr.push(doc.data());
                 let stringPrice = doc.data().price;
                 willysPrices += parseFloat(stringPrice);
               });
        }
         
        }
   
    }
    
    if (willysProductsArr.length < list.products.length) {
      productsNotFoundArr.push("willys");
    }
    if (hemkopProductsArr.length < list.products.length) {
      productsNotFoundArr.push("hemkop");
    }
    if (mathemProductsArr.length < list.products.length) {
      productsNotFoundArr.push("mathem");
    }
  
    setProductsNotFound([...productsNotFoundArr]);
     
    setHemkopTotalPrice(hemkopPrices);
    
    setWillysTotalPrice(willysPrices);
    setMathemTotalPrice(mathemPrices);
  
   
 }

  const fetchAllLists = async (userId) => {
   
    //Fetching favorite list of user with userId and favorite == true
    let favorite = await fetchLists(userId, true);
    

    //If such list exists set this list as favorite
    if (favorite.uid && favorite.products) {
      
      setFavoriteList(favorite);
      let lists = await fetchLists(userId, false);
     
      setProductLists(lists);
   
      if (lists.length > 0) {
        setCurrentProductList(lists[0]);
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
          await getTotalPriceOfProducts(res.newList)
          setCurrentProductList(res.newList);
        } else {
          setFavoriteList(res.newList);
        }
        return true;
      }
    } catch { }
    return false;
  };

  const addIsInList = (products) => {
    let newProducts = products;
    if (!products || products.length <= 0) {
      return products
    }
    for (let product of newProducts) {
      if (favoriteList) {
        let isFavorite = !!favoriteList.products.find((p) => p.productCode === product.productCode);
        product.isFavorite = isFavorite;
      }
      if (currentProductList) {
        let isInCurrentList = !!currentProductList.products.find((p) => p.productCode === product.productCode);
        product.isInCurrentList = isInCurrentList;   
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
    addIsInList,
    resetLists,
    hemkopTotalPrice,
    getTotalPriceOfProducts,
    fetchListById,
    willysTotalPrice,
    mathemTotalPrice,
    productsNotFound
  };

  return (
    <ProductListContext.Provider value={values}>
      {props.children}
    </ProductListContext.Provider>
  );
};

export default ProductListProvider;
