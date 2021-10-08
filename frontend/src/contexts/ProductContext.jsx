import { createContext, useContext } from "react";
import firestore from "../database_config/firestore";
import _ from "lodash";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {

  const fetchProductsByCode = async (productCodes) => {
    const docs = [];
    await productCodes.forEach(async (code) => {
        let snapshot = await firestore.collection("products").where("productCode", "==", code).get();
        snapshot.forEach((doc) => { docs.push({ id: doc.id, ...doc.data() }); })  
    })
    return docs;
  }

  const fetchProductsByCategory = async (category) => {
    const productCollection = "products"
    const docs = [];
    let snapshot = await firestore
      .collection(productCollection)
      .where("category", "==", category.id)
      .limit(20)
      .get();
    snapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    })
    return docs;
  };

  const fetchProducts = _.memoize(async (options) => {
    if (!options.category) {
      return [];
    }
    let data = {
      categoryId: options.category.id,
    };
    let res = await fetch("/rest/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    if (res.success && res.products) {
      return res.products;
    }
    return [];
  });

  const values = {
    fetchProductsByCategory,
    fetchProductsByCode,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
