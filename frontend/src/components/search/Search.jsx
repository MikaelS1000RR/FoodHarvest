import React, { useState } from 'react';

import SearchResult from './SearchResult';
import SearchBar from './SearchBar';
import { requestQuotes } from '../../apiTest';

const Search = () => {
  const [searchResults, setQuotes] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const onSearchSubmit = async term => {
    console.log('New Search submit:', term);

    //await requestQuotes(term); wait on matches db products collection
    const quotesArray = await requestQuotes(term);
    setNoResults(quotesArray.length === 0);
    setQuotes(quotesArray);
  };

  const clearResults = () => setQuotes([]);

  const renderedQuotes = searchResults.map((searchResult, i) => {
    return <SearchResult searchResult={searchResult} key={i} />
  })

  return (
    <div className='search'>
      <h1 className='title'>Search SearchResults</h1>

      <div className='disclaimer-container'>
        <p className='disclaimer'>
          Get 10 searchResults from your favorite <span className='highlight'>anime</span>!
        </p>
      </div>
      
      <SearchBar onSearchSubmit={onSearchSubmit} clearResults={clearResults}/>

      { noResults &&
        <p className='no-results'>
          No results found.
        </p>
      }
      <div className='main-content'>
        {renderedQuotes}
      </div>

    </div>
  );
};

export default Search;