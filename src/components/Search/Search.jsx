import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { ADD_MOVIE } from '../../redux/type';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MoviesQuery = (props) => {
    let history = useHistory();
    const [movie, setMovie] = useState ({name: "",});

    useEffect(() => {
        findTitle();
    },[]);
    // Esto es un Handler
     const updateDatos = (e) => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }
    const findTitle = async () => {
        let query = document.getElementById("title").value;
        axios
          .get(`https://api.themoviedb.org/3/search/movie?api_key=210d6a5dd3f16419ce349c9f1b200d6d&query=${query}`)
          .then((res) => {
                props.dispatch({type: ADD_MOVIE, payload: res.data.results});
                setMovie(res.data.results);
                document.getElementById("title").value = "";
                history.push('/searchInfo');
          })
          
          .catch((err) => {
            return Error("Wrong movie name");});
          
    }
    console.log(movie)
    return (
            <div className="inputContainer">
                <div className="inputSearch">
                    <input className="inputSearch" type="text" id="title" name="name" onClick={() => findTitle(updateDatos)}/>
                    <button className="sendButton" name="movie" onClick={() => findTitle(updateDatos)} >Find</button>
                </div>
            </div>
        ); 
 };
export default connect((state) => ({credentials: state.credentials,movies: state.movies}))(MoviesQuery);