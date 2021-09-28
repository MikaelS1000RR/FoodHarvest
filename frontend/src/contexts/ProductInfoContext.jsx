import { createContext, useContext, useState } from "react";

const ProductInfoContext = createContext();

export const useProductInfo = () => {
  return useContext(ProductInfoContext)
 }

const ProductInfoProvider = (props) => {

 const [currentProduct, setCurrentProduct] = useState(null);


  const values = {
    currentProduct,
    setCurrentProduct
  };

  return (
    <ProductInfoContext.Provider value={values}>
      {props.children}
    </ProductInfoContext.Provider>
  );
};

export default ProductInfoProvider;
