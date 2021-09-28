import React from 'react';
import { useState } from "react";
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';


const SearchBar = (props) => {

  // const [productSearch, setProductSearch] = useState('')

  // const goToSearchPage = (event) => {
  //   event.preventDefault()
  // }

  
  const [term, setTerm] = useState(props.term || '');

  function submit(e) {
    if(typeof props.search === 'function'){
      props.search(term)
    }
    console.log('term: ', term)
    e.preventDefault();
  }

  return (
    <Form style={styles.form} onSubmit={submit}>
      <FormGroup>
        <Input
        type='text'
        placeholder='Sök produkt'
          onChange={(event) => setTerm(event.target.value)}
          required
        />
      </FormGroup>
      <button
        style={styles.flex}
        className="form-control"
        onClick={submit}
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