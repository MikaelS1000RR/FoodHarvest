import { createContext, useState, useContext, useEffect } from "react";
import firestore from '../database_config/firestore'

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {

  const fetchProductsByCategory = async (category) => {
    // const productCollection = "products-test"
    const productCollection = "test-products-hemkop"
    const docs = [];
    let snapshot = await firestore
      .collection(productCollection)
      .where("category", "==", category.id)
      .limit(1)
      .get();
    snapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    })
    return docs;
  };

 const fetchProductByStoreAndProductId = async (productIds) => {
    const productCodes = [];
    for (let productId of productIds) {
      let product = await firestore.collection("products").doc(productId)
      let snapshot = await firestore
        .collection("products")
        .where("productCode", "==", product.productCode)
        .limit(1)
        .get();
      snapshot.forEach((doc) => {
        productCodes.push(doc.productCode);
      });  
   }
     return productCodes;

  } 

  const values = {
    fetchProductsByCategory,
    fetchProductByStoreAndProductId,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
