import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Rental from '../../components/Rental/Rental';
import { RENTALS } from '../../redux/type';
import axios from 'axios';
import ProfileAdmin from '../ProfileAdmin/ProfileAdmin';


const Profile = (props) => {
    let history = useHistory();

 
    if (props.credentials?.user.isAdmin === false) {
        return (
            <div className="bodyProfile">
                <div className="cardProfile">
                    <div className="profile"> <img className="imgProfile" src={props.credentials.user.imgUser} alt="profile" /></div>
                    {console.log(props.credentials.user.imgUser)}
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
                    <Rental/>
                    
                </div>
            </div>
        )
    } else {

        return (
            <ProfileAdmin/>
        )
    }
}
export default connect((state) => ({ credentials: state.credentials }))(Profile);