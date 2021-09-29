import React from 'react'

import { useHistory } from 'react-router'
import SearchBar from '../components/search/SearchBar';

const Home = () => {
    
    const history = useHistory();

    function search(term){
        const urlEncodedTerm = encodeURI(term);
        console.log("working")
        history.push(`/search?find_desc=${urlEncodedTerm}`)
    }

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <SearchBar search={search}/>
            </div>
        </div>
    )
}

export default Home;