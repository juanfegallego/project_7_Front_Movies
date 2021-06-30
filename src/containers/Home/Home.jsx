import React from 'react';
import { connect } from 'react-redux';
import MoviesHome from "../../components/MoviesHome/MoviesHome"
import MoviesComedy from '../../components/MoviesComedy/MoviesComedy';




const Home = () => {


    return (

        <div className="vistaHome">
            <div >
                Home
                <MoviesHome/>
                <MoviesComedy/>

            </div>
        </div>
    )
}

export default Home;