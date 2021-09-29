import { createContext, useState, useContext, useEffect } from "react";
import firestore from '../database_config/firestore'

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {

  const fetchProductsByCategory = async (categoryRef) => {
    const docs = [];
    let snapshot = await firestore
      .collection("test-products-willys")
      .where("category", "==", categoryRef)
      .limit(1)
      .get();
    
    snapshot.forEach((doc) => {          
      docs.push({ id: doc.id, ...doc.data() })
      }
    );
    return docs;
  };

  const values = {
    fetchProductsByCategory,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
