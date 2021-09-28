import { createContext, useState, useContext, useEffect } from "react";
import firestore from '../database_config/firestore'

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  console.log(props.prop, "props")
  useEffect(() => {
    fetchProducts(props);
  }, []);
//      .where("category", "==", '{"categoryName":"Kött, Fågel & Chark"}')

  const fetchProducts = (props) => {
    console.log(props.prop, "props i ProductContext")
    const myRequest = JSON.stringify(props.prop);
    console.log(myRequest, "myRequest");
    console.log(`{"categoryName":${myRequest}}`,"this is the fetch")

    firestore.collection('products')
      .where("category", "==", `{categoryName":${myRequest}}`)
      .limit(5)
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
