import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ADD_MOVIE } from "../../redux/type";
import Spinner from "../../components/Spinner/Spinner";


const SearchInfo = (props) => {

    let history = useHistory();
  const [searchView, setsearchView] = useState([]);

  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w200" 

  useEffect(() => {
    setsearchView(props.movies);
  }, []);

  const selectMovie = async (movie) => {
    try {
      props.dispatch({ type: ADD_MOVIE, payload: movie });
      setTimeout(() => {
        history.push("/movieInfo");
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  if (props.movie[0]?.id){
    return (
      <div className="allOrders">
        <div className="orderContent">
          {props.movie.map((searchView, index) => {
            return (
              <div className="orderCards" key={index}>
                <img
                  className="poster_path"
                  // src={!searchView.poster_path `https://image.tmdb.org/t/p/w200/${searchView.poster_path}`}
                  src={`${baseImgUrl}/${size}${searchView.poster_path}`} alt="poster"
                  onClick={() => selectMovie(searchView)} alt="poster_path"
                />
  
                <div className="voteAverage">
                  <FontAwesomeIcon className="faStart" icon={faStar} />
                  {searchView.vote_average}/10
                </div>
              </div>
            );
          })}
    
        </div>
      </div>
    ); 
  }else {
    return(
      <Spinner/>
    )
  }
  
};

export default connect((state) => ({
  credentials: state.credentials,
  movie: state.movie,
}))(SearchInfo);


