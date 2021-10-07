import _ from "lodash";
import { createContext, useContext } from "react";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {
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
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
