import React from 'react';
import { useState } from "react";
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const SearchBar = () => {

  const [productSearch, setProductSearch] = useState('')

  const goToSearchPage = (event) => {
    event.preventDefault()
  }

  return (
    <Form style={styles.form} onSubmit={goToSearchPage}>
      <FormGroup>
        <Input
          type="text"
          name="search"
          id="exampleSearch"
          placeholder="🔎 Sök produkt"
          onChange={(event) => setProductSearch(event.target.value)}
          required
        />
      </FormGroup>
      <button
        style={styles.flex}
        className="form-control"
        type="submit"
      >
      Search
      </button>
    </Form>
    
   );
}
 
export default SearchBar;

const styles = {
  form: {
    padding: "10px",
  },
  flex: {
    display: "flex",
  }
}