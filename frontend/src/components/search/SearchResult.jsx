import React from 'react';

const SearchResult = ({searchResult}) => {
    return (
        <div className='searchResult-container'>
          <p className="searchResult">
            "{searchResult.searchResult}"
          </p>
          <p className="searchResult-author">
            SearchResult by
            <span className='highlight'> {searchResult.character} </span>
            from
            <span className='highlight'> {searchResult.anime}</span>
          </p>
        </div>
      );
};

export default SearchResult;