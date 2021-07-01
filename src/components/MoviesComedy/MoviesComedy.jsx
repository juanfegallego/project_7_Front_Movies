import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ADD_MOVIE } from "../../redux/type";
import { connect } from "react-redux";



const MoviesComedy = (props) => {
    let history = useHistory();

    const [moviesComedy, setMoviesComedy] = useState([]);

    

    useEffect(() => {

        getMoviesComedy()

    }, [])


    const getMoviesComedy = async () => {
        try {
            let comedy = await axios.get(`http://localhost:3001/movies/genre/Comedy`);
           
            setMoviesComedy(comedy.data.results)
        } catch (error) {
            console.log(error);
        }
    }

    const clickHandler = (MovieInfo) => {
        props.dispatch({ type: ADD_MOVIE, payload: MovieInfo });
        history.push("/movieInfo");
      };

    // const pruebaSeleccion = (movie) => {
    //     console.log(movie);
    // }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"


    if (moviesComedy[0]?.id) {
        return (
            <div className="allContent">
                <div className="movieContent">
                    {moviesComedy.map((movie, index) => (
                        <div className="content" key={index}>
                            <div className="content2" >
                                {/* <p className="text">{movie.title} </p> */}
                                <img className="posterMovie" src={`${baseImgUrl}/${size}${movie.poster_path}`} alt="poster" onClick={() => clickHandler(movie)} />
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
  }))(MoviesComedy);

