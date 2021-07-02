import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { ADD_MOVIE } from "../../redux/type";



const MoviesHome = (props) => {
    let history = useHistory();

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        getMovies()
    
      }, [])


    const getMovies = async () =>{
        try {
            let movies = await axios.get(`http://localhost:3001/movies/`);
            setMovies(movies.data.results)
        } catch (error) {
            console.log(error);
        }
    }

    const clickHandler = (MovieInfo) => {
         //GUARDANDO EN REDUX
        props.dispatch({ type: ADD_MOVIE, payload: MovieInfo});
        history.push("/movieInfo");
    };

    // const pruebaSeleccion = (movie) => {
    //     console.log(movie);
    // }
   
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w300" 


    if (movies[0]?.id) {
        return (
            <div className="allContent">
                <div className="movieImage">
                    <div className="fondoIMage"></div>
                </div>
                <div className="movieContent">
                    {movies.map((movie, index) => (
                        <div className="content" key={index}>
                            <div className="content2" >
                                {/* <p className="text">{movie.title} </p> */}
                                <img src={`${baseImgUrl}/${size}${movie.poster_path}`} alt="poster" onClick={()=>clickHandler(movie)}/>
                                {/* <p className="text">{movie.getSimilarMovies}</p> */}
                                {/* <div className="enviar" onClick={() => llevame()}></div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="spinnerContainer">
                <div className="spinner">
                    {/* <img  src={spinner} alt="spinner" width="60" /> */}
                    cargando...
                </div>
            </div>
        );
    }
};



export default connect((state) => ({
    credentials: state.credentials,
    movie : state.movie
  }))(MoviesHome);