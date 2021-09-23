import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const SearchBar = () => {
  return (
    <Form>
      <FormGroup>
        <Input
          type="search"
          name="search"
          id="exampleSearch"
          placeholder="Sök efter mat"
        />
      </FormGroup>
    </Form>
    
   );
}
 
export default SearchBar;