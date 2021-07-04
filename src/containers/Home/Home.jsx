import React from 'react';
import { connect } from 'react-redux';
import MoviesHome from "../../components/MoviesHome/MoviesHome"
import MoviesComedy from '../../components/MoviesComedy/MoviesComedy';
import MoviesWar from '../../components/MoviesWar/MoviesWar';




const Home = () => {


    return (

        <div className="vistaHome">
            <div >
                <h1>Top Rated</h1>
                <MoviesHome />
                <h1>Movies Comedy</h1>
                <MoviesComedy />
                <h1>Movies War</h1>
                <MoviesWar />

            </div>
        </div>
    )
}

export default Home;