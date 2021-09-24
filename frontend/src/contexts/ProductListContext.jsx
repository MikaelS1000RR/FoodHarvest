import { createContext, useState, useContext } from "react";
import firestore from "../database_config/firestore";

const ProductListContext = createContext();

export const useProductList = () => {
  return useContext(ProductListContext);
};

const ProductListProvider = (props) => {
  const [currentProductList, setCurrentProductList] = useState(null);
  const [productLists, setProductLists] = useState(null);

  const fetchProductLists = async (userId) => {

    const ref = await firestore.collection('product-lists');
    const query = await ref.where('uid', '==', userId).get();
    let data = [];
    query.forEach((doc) => {
      data.push({id: doc.id, ...doc.data()})
    })
    setCurrentProductList(data[0]);
    setProductLists(data);
  }

  const values = {
    currentProductList,
    setCurrentProductList,
    productLists,
    fetchProductLists
  }

  return (
    <ProductListContext.Provider value={values}>
      {props.children}
    </ProductListContext.Provider>
  );
}
 
export default ProductListProvider;