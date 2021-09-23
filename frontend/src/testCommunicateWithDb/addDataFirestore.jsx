import React, { useState } from 'react';
import firestore from '../db_config_frontend/firestore';

const AddDataFirestore = () => {
  // Initial item contains empty strings
  // with the brand and foodType
  const initialItemValues = {
    brand: '',
    foodType: '',
    price: 0
  };
  const [item, setItem] = useState(initialItemValues);

  // Will be executed when the form is submitted.
  // If the brand and foodType has some length
  // we'll send the object to our firestore
  // collection as a document. Then we clear the
  // item state when it has succeeded
  const onSubmit = (event) => {
    event.preventDefault();

    // These lines are new
    if (item.brand.length && item.foodType.length && item.price !== 0) {
      firestore
        .collection('test-products')
        .doc()
        .set(item)
        .then(() => setItem(initialItemValues))
        .catch((error) => console.error(error));
    }
  };

  // Set the value for the current
  // element within our state
  const onChange = ({ target }) => {
    setItem({
      ...item,
      [target.name]: target.value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="brand"
        placeholder="brand"
        value={item.brand}
        onChange={onChange}
      />
      <textarea
        name="foodType"
        placeholder="foodType"
        value={item.foodType}
        onChange={onChange}
      />
      <textarea
        name="price"
        placeholder="price"
        value={item.price}
        onChange={onChange}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default AddDataFirestore;