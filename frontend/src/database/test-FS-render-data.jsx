import React, { useState, useEffect } from 'react';
import firestore from './firestore';

const Products = () => {
  // Set default as null so we
  // know if it's still loading
  const [products, setproducts] = useState(null);

  // Initialize with listening to our
  // products collection. The second argument
  // with the empty array makes sure the
  // function only executes once
  useEffect(() => {
    listenForproducts();
  }, []);

  // Use firestore to listen for changes within
  // our newly created collection
  const listenForproducts = () => {
    firestore.collection('test-products').onSnapshot(
      (snapshot) => {
        // Loop through the snapshot and collect
        // the necessary info we need. Then push
        // it into our array
        const allproducts = [];
        snapshot.forEach((doc) => allproducts.push(doc.data()));

        // Set the collected array as our state
        setproducts(allproducts);
      },
      (error) => console.error(error)
    );
  };

    // If the state is null we
  // know that it's still loading
  if (!products) {
    return <div>Loading...</div>;
  }

  // Render all the products with no
  // specific order
  const renderproducts = () => {
    // If the array is empty we inform
    // the user that there's no products
    if (!products.length) {
      return <div>There's no products yet...</div>;
    };

    // Otherwise we'll render the products.
    // Using index as key 🙈
    return products.map(({ brand, foodType, price }, index) => (
      <div key={index}>
        <h1>{brand}</h1>
        <h3>{foodType}</h3>
        <h4>{price}</h4>
      </div>
    ));
  };

  // Render products
  return renderproducts();
};

export default Products;