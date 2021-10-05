import React, { useState } from 'react';
import {Container, Row} from "reactstrap" 

import SearchBar from './SearchBar';
import ProductCard from '../home/ProductCard';
import { requestQuotes } from '../../configs/firestoreSearchProducts';
import { useProductList } from '../../contexts/ProductListContext';

const Search = () => {
  const [searchResults, setQuotes] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const { favoriteList, currentList, addIsFavorite } = useProductList()

  const onSearchSubmit = async term => {
    console.log('New Search submit:', term);

    //await requestQuotes(term); wait on matches db products collection
    let options = {
      favoriteList: favoriteList,
      currentList: currentList
    }
    let quotesArray = await requestQuotes(term.toLowerCase(), options);
    quotesArray = addIsFavorite(quotesArray)
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