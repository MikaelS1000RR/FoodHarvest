import React, { useState } from 'react';
import firestore from '../database_config/firestore';

const TestDataSchema = () => {
  // Initial item contains empty strings
  // with the name and message
  const initialItemValues = {
    brand: '',
    category: '',
    foodType: '',
    price: 0

  };
  const [item, setItem] = useState(initialItemValues);

  // Will be executed when the form is submitted.
  // If the name and message has some length
  // we'll send the object to our firestore
  // collection as a document. Then we clear the
  // item state when it has succeeded
  const onSubmit = (event) => {
    console.log("submit")
    event.preventDefault();

    //check if any field are empty
    if (item.brand.length && item.category.length && item.foodType.length && item.price !== 0) {
      firestore
        .collection('test-products')
        .doc()
        .set(item)
        .then(() => setItem(initialItemValues))
        .catch((error) => console.error(error));
    } else{
      console.log("item invalid, try again")
    }
    
  };

  // Set the value for the current
  // element within our state
  const onChange = ({ target }) => {
    setItem({
      ...item,
      [target.name]: target.value
    });
  };

  const renderForm = () => {
    return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="brand"
        placeholder="brand"
        value={item.brand}
        onChange={onChange}
      />
      <input
        type="text"
        name="category"
        placeholder="category"
        value={item.category}
        onChange={onChange}
      />
            <input
        type="text"
        name="foodType"
        placeholder="foodType"
        value={item.foodType}
        onChange={onChange}
      />
            <input
        type="number"
        name="price"
        placeholder="price"
        value={item.price}
        onChange={onChange}
      />
      <button type="submit">Send</button>
    </form>
  );
  }

  return renderForm();
};

export default TestDataSchema;