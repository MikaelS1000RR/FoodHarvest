import { createContext, useState, useContext, useEffect } from "react";
import firestore from '../database_config/firestore'

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    console.log("NOTHING FOUND")
    firestore.collection('products')
      .where("category", "==", '{"categoryName":"Kött, Fågel & Chark"}')
      .limit(20)
      .onSnapshot(
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }))
        setProducts(docs)
      }
    )
  };

  const values = {
    products,
    fetchProducts
  };

  return (
    <ProductContext.Provider value={values}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
