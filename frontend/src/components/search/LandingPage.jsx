import React from 'react'
import SearchBar from './SearchBar'
import { useHistory } from 'react-router'

const LandingPage = () => {
    
    const history = useHistory();

    function search(term){
        const urlEncodedTerm = encodeURI(term);
        console.log("working")
        history.push(`/search?find_desc=${urlEncodedTerm}`)
    }

    return (
        <div>
            <div>
                <SearchBar search={search}/>
            </div>
        </div>
    )
}

export default LandingPage;