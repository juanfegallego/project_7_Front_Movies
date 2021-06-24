import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";



const MoviesComedy = () => {
    let history = useHistory();

    const [moviesComedy, setMoviesComedy] = useState([]);

    useEffect(() => {

        getMoviesComedy()
    
      }, [])


    const getMoviesComedy = async () =>{
        try {
            let comedy = await axios.get(`http://localhost:3001/movies/genre/comedy`);
            //GUARDANDO EN REDUX
            // props.dispatch({ type: REST, payload: res.data });
            setMoviesComedy(comedy.data.results)
        } catch (error) {
            console.log(error);
        }
    }

    const pruebaSeleccion = (movie) => {
        console.log(movie);
    }
   
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200" 


    if (moviesComedy[0]?.id) {
        return (
            <div className="allContent">
                <div className="movieImage">
                    <div className="fondoIMage"></div>
                </div>
                <div className="movieContent">
                    {moviesComedy.map((movie, index) => (
                        <div className="content" key={index}>
                            <div className="content2" > COMEDY
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




export default MoviesComedy;