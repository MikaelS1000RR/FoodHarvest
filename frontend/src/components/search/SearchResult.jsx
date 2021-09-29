import React from "react";
import SearchResultSummary from "./SearchResultSummary";
import SearchResultList from './SearchResultList'
import useReactRouter from 'use-react-router';
import SearchBar from "./SearchBar";

const SearchResult = () => {

    const {location} = useReactRouter();
    const params = new URLSearchParams(location.search);
    const term = params.get('find_desc');

    return (
        
        <div>
            <SearchBar/>
            <SearchResultSummary term={term}/>
            <SearchResultList/>
        </div>
    )


}

export default SearchResult;