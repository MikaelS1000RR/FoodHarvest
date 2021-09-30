import React, { useState } from 'react';

const SearchBar = ({onSearchSubmit, clearResults}) => {
    const [term, setTerm] = useState('');

    // submit a new search
    const submit = (event) => {
      event.preventDefault()
        if(term !== ''){
            onSearchSubmit(term);
        }
        else{
            clearResults();
        }
    }

    return (
      <form className='searchbar' onSubmit={submit}>
        <input 
            className='searchbar-input' 
            type='text' 
            placeholder="Search by title. . ."
            onChange={e => setTerm(e.target.value)}
            value={term}/>
          <button type='submit'>
            Submit
          </button>
      </form>
    );
};

export default SearchBar;