import React, { useState } from 'react';
import {Container, Row} from "reactstrap" 

import SearchBar from './SearchBar';
import { requestProducts } from '../../search/firestoreSearchProducts';
import ProductCard from '../productCard/ProductCard';
import { useProductList } from '../../contexts/ProductListContext';

const Search = () => {
  const [searchResults, setQuotes] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { addIsInList } = useProductList()

  const onSearchSubmit = async (term) => {

    const quotesArray = await requestProducts(term.toLowerCase());
    setQuotes(addIsInList(quotesArray))
    setNoResults(quotesArray.length === 0);
    setQuotes(quotesArray);
  };

  const clearResults = () => setQuotes([]);

  const renderedQuotes = searchResults.map((searchResult, i) => {
    return (
      <ProductCard
        classNames={"col-6 col-sm-4 col-md-3 col-lg-2"}
        product={searchResult}
        key={i}
      />
    );
  });

  return (
    <div className="search">
      <div className="disclaimer-container">
        <p className="disclaimer"></p>
      </div>

      <SearchBar onSearchSubmit={onSearchSubmit} clearResults={clearResults} />

      {noResults && <p className="no-results">No results found.</p>}
      <Container>
        <Row>{renderedQuotes}</Row>
      </Container>
    </div>
  );
};



export default Search;