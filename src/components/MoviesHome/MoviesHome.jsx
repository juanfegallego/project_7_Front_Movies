import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";



const MoviesHome = () => {
    let history = useHistory();

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        getMovies()
    
      }, [])


    const getMovies = async () =>{
        try {
            let movies = await axios.get(`http://localhost:3001/movies/`);
            //GUARDANDO EN REDUX
            // props.dispatch({ type: REST, payload: res.data });
            setMovies(movies.data.results)
        } catch (error) {
            console.log(error);
        }
    }

    const pruebaSeleccion = (movie) => {
        console.log(movie);
    }
   
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200" 


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
                                <p className="text">{movie.title} </p>
                                <img src={`${baseImgUrl}/${size}${movie.poster_path}`} alt="poster" onClick={()=>pruebaSeleccion(movie)}/>
                                {/* <p className="text">{movie.popularity}</p>
                                <p className="text">{movie.release_date}</p>
                                <p className="text">{movie.vote_average}</p>
                                <p className="text">{movie.genre_id}</p>
                                <p className="text">{movie.overview}</p> */}
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




export default MoviesHome;