import { createContext, useState, useContext, useEffect } from "react";
import firestore from '../database_config/firestore'

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {

  const fetchProducts = async (options) => {
    console.log("hämta produkter by kategorier");
    let data = {
      categoryId: options.category.id,
      favoriteList: options.favoriteList
    };
    let res = await fetch("/rest/products", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    console.log(res);
    if (res.success && res.products) {
      return res.products;
    }
    return [];
  };

  const values = {
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
