import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";

const SearchBar = ({ onSearchSubmit, clearResults }) => {
  const [term, setTerm] = useState("");

  // submit a new search
  const submit = (event) => {
    event.preventDefault();
    if (term !== "") {
      onSearchSubmit(term);
    } else {
      clearResults();
    }
  };

  return (
    <Form style={styles.form} onSubmit={submit}>
      <FormGroup>
        <Input
          type="text"
          placeholder="Sök på produkt. . ."
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
      </FormGroup>
    </Form>
  );
};

export default SearchBar;

const styles = {
  form: {
    boxShadow: 
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    marginBottom: "3rem"
   
  },
};
