import React, { useState } from 'react'
import { useHistory } from "react-router";
import { connect } from "react-redux";
import axios from 'axios';
import { ADD_MOVIE } from '../../redux/type';


const MovieInfo = (props) => {

  let history = useHistory();

  const [card, setCard] = useState(false);

  const [datos,setDatos] = useState({
    token: props.credentials?.token,
    user: props.credentials?.user,
    movieId: props.movie?.id,
    movieTitle: props.movie?.original_title,
    imageMovie: props.movie?.poster_path,
    rentalDate: new Date(),
    returnDate: new Date()
});

  // Esto es un Handler
  const updateCredentials = (e) => {
    setDatos({...datos, [e.target.name]: e.target.value})
  }


  const RentMovie = () => { setCard(true) }

  const ShowOrder = () => {

    const order = async () => {

    let token = props.credentials?.token;

    // A continuamos, generamos el body de datos
    let body = {
        userId : datos.user.id,
        movieId: datos.movieId,
        movieTitle: datos.movieTitle,
        imageMovie : datos.moviePoster,
        rentalDate: datos.rentalDate,
        returnDate: datos.returnDate
    }

      // Envío por axios
      console.log('body', body);
      axios
      .post("http://localhost:3001/orders", body, {headers:{'authorization':'Bearer ' + token}})
      .then((res) => {
        console.log("holaaaaa",res.data.results)
        setTimeout(()=>{
          history.push("/profile");
        },250)

        if(!res.data.user.isAdmin){
          history.push('/user')
        } else {
            history.push('/admin')
        }
    })

    .catch((err) => {
                //con este console log puedo saber errores tipo 500
        //   console.log(err.response.data.message);

        console.log('Err');



    });
}

    return (
      <div>
        <div className="box1 rent">

            <input className="input1" type="date" value={datos.rentalDate} name="rentalDate" onChange={updateCredentials} />
            <input className="input1" type="date" value={datos.returnDate} name="returnDate" onChange={updateCredentials} />

            <button onClick={() => order()}>Send</button>
        </div>
        {/* <h2>{props.a}</h2> */}
      </div>
    );
}
  const HomePage = (props) => {
    return (
      <div>
        <h2> {props.h}</h2>
      </div>
    );
  }

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size_back_drop = "w1280";
  const size = "w300";

  const rent = () => {

    props.dispatch({type:ADD_MOVIE,payload: props.movie});
  }


  if (props.movie?.id && props.credentials?.user) {
    return (
      <div className="contentDetail">
        <div className="vistaDetail">
          <div className="imagenD">
            <img
              src={`${baseImgUrl}/${size}${props.movie.poster_path}`}
              alt="poster"
            />
          <img className="back_img" src={`${baseImgUrl}/${size_back_drop}${props.movie.backdrop_path}`}
          alt="backdrop_path"/>
          </div>
          <div className="contentSpan">
              <p className="titleD">{props.movie.original_title} </p>
              <p className=" over">Overview {props.movie.overview}</p>
              <p className=" vote">Vote {props.movie.vote_average}</p>
              <p className=" popu">populatity{props.movie.popularity}</p>
              <p className=" date">premiere{props.movie.release_date}</p>
              <p className=" lang">original language {props.movie.original_language}</p>
            {/* <p className="text">{props.movie.getSimilarMovie}</p> */}
          </div>
        </div>

        {/* <Cart /> */}

        {/* <Link to={"/rentmovie"} onClick={() => rent()}>Rent</Link> */}

        <button onClick={() => RentMovie(!card)}> Rent Movie
          {/* {allStatements} */}
        </button>
        {card ? <ShowOrder a={card} /> : <HomePage h={card} />}

      
      </div>
    );
  } else {
    return <div>ESTOY CARGANDO!</div>;
  }
};

export default connect((state) => ({
  credentials: state.credentials,
  movie: state.movie,
}))(MovieInfo);