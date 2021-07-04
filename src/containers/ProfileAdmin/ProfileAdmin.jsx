import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { RENTALS } from '../../redux/type';
import AllRentals from '../../components/AllRentals/AllRentals';

function ProfileAdmin(props) {
    let history = useHistory();

    // useEffect(() => {
    //     setTimeout(() => {
    //         getUserBokings()
    //     }, 1000);
    // }, [])
    // const getUserBokings = async () => {
    //     try {
    //         let res = await axios.get(`http://localhost:3001/orders/${props.credentials.idUser}`,{headers:{'authorization':'Bearer ' + props.credentials.token}});
    //         //GUARDANDO EL REDUX
    //         props.dispatch({ type: RENTALS, payload: res.data });
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

  

    if (props.credentials?.user.token !== '') {
        return (
            <div className="bodyProfileAdmin">
                <div className="cardProfileAdmin">
                    <div className="profileAdmin"> <img className="imgProfile" src={props.credentials.user.imgUser} alt="profile" /></div>
                    {console.log(props.credentials.user.imgUser)}
                    <div className="textProfileAdmin">
                        <div className="adminName">{props.credentials.user.name}</div>
                        <div className="adminSurname">{props.credentials.user.surname}</div>
                        <div className="adminEmai">{props.credentials.user.email}</div>

                    </div>
                </div>
                <div className="allRents">


                    <AllRentals />

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
export default connect((state) => ({ credentials: state.credentials }))(ProfileAdmin);