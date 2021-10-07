import { createContext, useContext } from "react";
import firestore from "../database_config/firestore";
import _ from "lodash";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {

  const fetchProductsByCode = async (productCodes) => {
    const docs = [
      // For testing only. Make docs to empty array for use with db
      // {
      //   imageUrl:
      //     "//static.mathem.se/shared/images/products/original/07331746202360_c1c1.jpg",
      //   brand: "Favorit",
      //   productName: "Gouda Skivad EKO",
      //   price: 33,
      // },
      // {
      //   imageUrl:
      //     "//static.mathem.se/shared/images/products/original/07310941801066_g1r1.jpg",
      //   brand: "Pastejköket",
      //   productName: "Leverpastej",
      //   price: 24,
      // },
    ];

    await productCodes.forEach(async (code) => {
        let snapshot = await firestore.collection("products").where("productCode", "==", code).get();
        snapshot.forEach((doc) => { docs.push({ id: doc.id, ...doc.data() }); })  
    })
    return docs;
  }

  const fetchProductsByCategory = async (category) => {
    // const productCollection = "products-test"
    const productCollection = "test-products"
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
