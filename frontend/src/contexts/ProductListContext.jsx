import { createContext, useState, useContext } from "react";
import firestore from "../database_config/firestore";

const ProductListContext = createContext();

export const useProductList = () => {
  return useContext(ProductListContext);
};

const ProductListProvider = (props) => {
  const [currentProductList, setCurrentProductList] = useState(null);
  const [productLists, setProductLists] = useState(null);

  const fetchProductLists = (userId) => {
    // firestore.collection('product')
  }

  const values = {
    currentProductList,
    setCurrentProductList  
  }

  return (
    <ProductListContext.Provider value={values}>
      {props.children}
    </ProductListContext.Provider>
  );
}
 
export default ProductListProvider;