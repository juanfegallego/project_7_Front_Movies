import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { RENTALS } from '../../redux/type.js';
import moment from 'moment';
import Spinner from '../Spinner/Spinner';

const AllUsers = (props) => {

    let history = useHistory();

    const [allUsers, setAllUsers] = useState([]);
    const [datos,setDatos] = useState({
        token: props.credentials?.token,
        user: props.credentials?.user,
    });

    useEffect(() => {
        findUsers();
    }, []);

    const findUsers = () => {

        let token = props.credentials?.token;
        let body = {
            id : datos.user.id,
        }

        axios
        .post("http://localhost:3001/users/allUsers", body, {headers:{'authorization':'Bearer ' + token}})
        .then((res) => {

            setAllOrders(res.data);
            props.dispatch({ type: RENTALS, payload: res?.data });

        })
       
        .catch((err) => {
            console.log('Err');
        });
    }

    const baseImgUrl = "https://image.tmdb.org/t/p";
    const size = "w300";

    const clickHandler = (MovieInfo) => {
        //GUARDANDO EN REDUX
       props.dispatch({ type: RENTALS, payload: MovieInfo});
       history.push("/movieInfo");
   };

   const deleteOrder = async (order) => {

    let token = props.credentials?.token;
    let id = props.credentials?.user.id;

    let body = {
        userId: id,
        id: order.id
    }

    await axios.post('http://localhost:3001/orders/adminDelete', body, { headers: { 'authorization': 'Bearer ' + token } })

    window.location.reload();

}

    if (allUsers[0]?.id) {

        return (
            <div className="allUsers">

            <div className="usersContent">

                {allUsers.map((users, index) => (

                    <div key={index} className="usersCards">

                        <img src={`${baseImgUrl}/${size}${users.imageMovie}`} alt="poster" onClick={()=>clickHandler(order)}/>
                        <div className="info">
                            <div className="buttonDelete" onClick={() => deleteOrder(order)}>DELETE</div>
                            <p className="order"> Movie ID : {(order.movieId)} </p>
                            <p className="order"> User name : {(order.name)} </p>
                            <p className="order"> User surname: {(order.surname)}</p>
                            <p className="order"> Rental Date : { moment (order.rentalDate).format('LL')} </p>
                            <p className="order"> Return Date : { moment (order.returnDate).format('LL')} </p>
                        </div>

                    </div>
                ))}
        </div>
        </div>
    );
        } else {
            return (
              <div className="spinnerContainer">
                <div className="spinner">
                <Spinner/>
                </div>
              </div>
            );
        }
}

export default connect((state)=>({
    credentials: state.credentials,
    infoUser: state.infoUser
}))(AllRentals);