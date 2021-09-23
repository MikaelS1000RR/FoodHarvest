import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const SearchBar = () => {
  return (
    <Form style={styles.form}>
      <FormGroup>
        <Input
          type="search"
          name="search"
          id="exampleSearch"
          placeholder="🔎 Sök efter mat"
        />
      </FormGroup>
    </Form>
    
   );
}
 
export default SearchBar;

const styles = {
  form: {
    padding: "10px",
    display: "flex",
    justifyContent: "center"
  }
}