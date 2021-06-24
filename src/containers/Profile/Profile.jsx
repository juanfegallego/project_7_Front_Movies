import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import moment from 'moment';

import { ADD_BOOKINGS } from '../../redux/type';
import axios from 'axios';


const Profile = (props) => {
    let history = useHistory();

    // useEffect(() => {
    //     setTimeout(() => {
    //         getUserBokings()
    //     }, 1000);
    // }, [])
    // const getUserBokings = async () => {
    //     try {
    //         let res = await axios.get(`http://localhost:3005/booking/userbooking/${props.credentials.idUser}`,{headers:{'authorization':'Bearer ' + props.credentials.token}});
    //         //GUARDANDO EL REDUX
    //         props.dispatch({ type: ADD_BOOKINGS, payload: res.data });
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    if (props.credentials?.user.token !== '') {
        return (
            <div className="bodyProfile">
                <div className="cardProfile">
                    <div className="profile"> <img className="imgProfile" src={props.credentials.user.imgUser} alt="profile" /></div>
                    <div className="textProfile">
                        <div>{props.credentials.user.name}</div>
                        <div>{props.credentials.user.surname}</div>
                        <div>{props.credentials.user.email}</div>
                        <div>{props.credentials.user.phoneNumber}</div>
                        <div>{props.credentials.user.country}</div>
                        <div>{props.credentials.user.city}</div>
                        <div>{moment(props.credentials.user.birthday).format('LL')}</div>
                    </div>
                </div>
                <div className="reservas">
                    {/* <Reservas /> */}
                    
                </div>
            </div>
        )
    } else {
        setTimeout(() => {
            history.push("/login");
        }, 3000)
        return (
            <div>NO ESTAS LOGEADO, NO PUEDES ENTRAR AQUI</div>
        )
    }
}
export default connect((state) => ({ credentials: state.credentials }))(Profile);