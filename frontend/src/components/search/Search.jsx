import React, { useState } from 'react';
import {Container, Row} from "reactstrap" 
import SearchBar from './SearchBar';
import { requestProducts } from '../../configs/firestoreSearchProducts';
import ProductCard from '../productCard/ProductCard';
import { useProductList } from '../../contexts/ProductListContext';

const Search = () => {
  const [searchResults, setProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { addIsInList } = useProductList()

  const onSearchSubmit = async (term) => {

    //await requestProducts(term); wait on matches db products collection
    const productsArray = await requestProducts(term.toLowerCase());
    setProducts(addIsInList(productsArray))
    setNoResults(productsArray.length === 0);
    setProducts(productsArray);
  };

  const clearResults = () => setProducts([]);

  const renderedProducts = searchResults.map((searchResult, i) => {
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
        <Row>{renderedProducts}</Row>
      </Container>
    </div>
  );
};

export default Search;