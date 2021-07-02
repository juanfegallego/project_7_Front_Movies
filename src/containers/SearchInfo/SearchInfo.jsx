import React from 'react';
import {useHistory} from 'react-router-dom';


const SearchInfo = (props) => {

    let history = useHistory();

    const llevame = () => {
        history.push(props.lugar);
    }

    return (
        <div className="boton" onClick={()=>llevame()}>
            {props.destino}
        </div>
    )
}

export default SearchInfo;

