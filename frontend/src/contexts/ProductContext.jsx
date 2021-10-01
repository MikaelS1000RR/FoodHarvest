import { createContext, useState, useContext, useEffect } from "react";
import firestore from '../database_config/firestore'

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {

  const fetchProductsByCategory = async (category) => {
    console.log("inne i fetch");
    const docs = [];
    let snapshot = await firestore
      .collection("products")
      .where("category", "==", category.ref)
      .limit(1)
      .get();
    
    snapshot.forEach((doc) => {
      docs.push({ id: doc.id, ref: doc.ref, ...doc.data() });
    })
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
