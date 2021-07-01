
import React from 'react';
import {useHistory} from 'react-router-dom';


const Search = (props) => {

    let history = useHistory();

    const llevame = () => {
        history.push(props.lugar);
    }

    return (
        <input>
        
        </input>
    )
}

export default Search;

