import ProductCard from "../components/home/ProductCard";
import data from '../testData.js' // will be removed when real data is fetched
import React from "react";
import SearchBar from "../components/SearchBar";
import firestore from '../database_config/firestore';
import { useState, useEffect } from 'react';

const Home = () => {

  const [products, setproducts] = useState(null);
  
    useEffect(() => {
    listenForproducts();
    }, []);
  
    const listenForproducts = () => {
    firestore.collection('test-products').onSnapshot(
      (snapshot) => {
        // Loop through the snapshot and collect
        // the necessary info we need. Then push
        // it into our array
        const allproducts = [];
        snapshot.forEach((doc) => allproducts.push({ id: doc.id, ...doc.data() }));

        // Set the collected array as our state
        setproducts(allproducts);
      },
      (error) => console.error(error)
    );
  };

    if (!products) {
    return (<div>Loading...</div>)
  }
  else if (!products.length) {
    return (<div>There's no products yet...</div>)
  }
  else {
    return (
      <div className="container" style={styles.container}>
        <SearchBar />
        <div className="row gy-3">
          {products.map((p, index) => (
            <ProductCard
             key={}
            index={index}
              product={p}
              classNames={"col-6 col-sm-4 col-md-3 col-lg-2"}
              buttonText="Lägg till"
              />
          ))}
        </div>
     
      </div>
    );
  }
}
 
export default Home;

const styles = {
  container: {
    minWidth: "100vw",
    background: "pink"
  },
};
