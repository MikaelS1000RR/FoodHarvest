import React, { useState } from 'react';
import {Container, Row} from "reactstrap" 


import SearchBar from './SearchBar';
import { requestQuotes } from '../../firestoreSearchProducts';
import ProductCard from '../home/ProductCard';

const Search = () => {
  const [searchResults, setQuotes] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const onSearchSubmit = async term => {
    console.log('New Search submit:', term);

    //await requestQuotes(term); wait on matches db products collection
    const quotesArray = await requestQuotes(term.toLowerCase());
    setNoResults(quotesArray.length === 0);
    setQuotes(quotesArray);
  };

  const clearResults = () => setQuotes([]);

  const renderedQuotes = searchResults.map((searchResult, i) => {
    return <ProductCard classNames={"col-6 col-sm-4 col-md-3 col-lg-2"} product={searchResult} key={i} />
  })

  return (
    <div className='search'>
      <div className='disclaimer-container'>
        <p className='disclaimer'>
        </p>
      </div>
      
      <SearchBar onSearchSubmit={onSearchSubmit} clearResults={clearResults}/>

      { noResults &&
        <p className='no-results'>
          No results found.
        </p>
      }
      <Container>
        <Row>
          {renderedQuotes}
        </Row>
      </Container>

    </div>
  );
};



export default Search;