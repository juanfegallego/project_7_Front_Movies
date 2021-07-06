import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";



const Register = () => {
  let history = useHistory();


  //Hooks
  const [datosUser, setDatosUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    telephone: "",
    country: "",
    city: "",
    address: "",
    birthday: "",
  });
 




  const [msgError, setMensajeError] = useState("");

  // hooks controlador de errores registros
  const [errors, setErrors] = useState({
    eName: "",
    eSurname: "",
    eEmail: "",
    ePassword: "",
    eTelephone: "",
    eBirthday: "",
    eCountry: "",
    eCity:"",
  });



  //Handlers (manejadores)
  
  const updateFormulario = (e) => {
  
    setDatosUser({ ...datosUser, [e.target.name]: e.target.value });
  };


  const checkError = (arg) => {
    switch (arg) {
      case "name":
        if (
          !/^(?=.{3,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test(
            datosUser.name
          )
        ) {
          setErrors({ ...errors, eName: "El nombre introducido no es valido" });
        } else {
          setErrors({ ...errors, eName: "" });
        }
        break;

      case "surname":
        if (
          !/^(?=.{3,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+[-!$%^&*()_+|~=`{}";'<>?,.]+)*$/.test(
            datosUser.surname
          )
        ) {
          setErrors({
            ...errors,
            eSurname: "El apellido introducido no es valido",
          });
        } else {
          setErrors({ ...errors, eSurname: "" });
        }
        break;
      case "email":
        if (datosUser.email.length < 1) {
          setErrors({
            ...errors,
            eEmail: "El campo email no puede estar vacío.",
          });
        } else if (
          !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(
            datosUser.email
          )
        ) {
          setErrors({
            ...errors,
            eEmail: "Introduce el formato de email valido ejemplo@ejemplo.com",
          });
        } else {
          setErrors({ ...errors, eEmail: "" });
        }
        break;

      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*)(?=.{8,})/.test(
            datosUser.password
          )
        ) {
          // (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(datosUser.password))
          setErrors({
            ...errors,
            ePassword:
              "contraseña de mínimo 8 caracteres, mayúsculas, minúsculas, un número",
          });
        } else {
          setErrors({ ...errors, ePassword: "" });
        }
        break;

      case "telephone":
        if (
          !/^(\+34|0034|34)?[-]*(6|7|9)[-]*([0-9][ -]*){8}/.test(
            datosUser.pTelephone
          )
        ) {
          setErrors({
            ...errors,
            eTelephone: "Numero introducido no es valido",
          });
        } else {
          setErrors({ ...errors, eTelephone: "" });
        }
        break;

      case "birthday":


        if (
          !/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/.test(
            datosUser.birthday
          )
        ) {
          setErrors({
            ...errors,
            eBirthday: "Por favor escriba una fecha del tipo YYYY/MM/DD",
          });
        } else {
          setErrors({ ...errors, eBirthday: "" });
        }
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    // este useEffect se ejecuta solo una  vez cuando el componente esta compntado
    // Este if comprueba que los campos del formulario esten llenos
  }, []);

  //Funciones
  const ejecutaRegistro = async () => {
    let user = {
      name: datosUser.name,
      surname: datosUser.surname,
      email: datosUser.email,
      password: datosUser.password,
      telephone: datosUser.telephone,
      country: datosUser.country, 
      // document.getElementById('opcionCountry')
      city: datosUser.city,
      birthday: datosUser.birthday,
    };

    console.log("soy ejecuta",user)
    axios
      .post("https://back-rental-movies.herokuapp.com//users/", user)
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });

    if (datosUser.password !== "" && datosUser.email !== "") {
      setTimeout(() => {
        history.push("/login");
      }, 750);
    } else {
      setMensajeError("los datos no estan completos");
    }
  };

  return (
    <div className="formularios">
      <div className="formulario1">
        <input
          className="inputBase"
          type="text"
          name="name"
          onChange={updateFormulario}
          placeholder="Name"
          onBlur={() => checkError("name")}
        ></input>
        <div className="error">{errors.eName}</div>

        <input
          className="inputBase"
          type="text"
          name="surname"
          onChange={updateFormulario}
          placeholder="Surname"
          onBlur={() => checkError("surname")}
        ></input>
        <div className="error">{errors.eSurname}</div>
        <input
          className="inputBase"
          type="email"
          name="email"
          onChange={updateFormulario}
          placeholder="Email"
          onBlur={() => checkError("email")}
        ></input>
        <div className="error">{errors.eEmail}</div>
        <input
          className="inputBase"
          type="string"
          name="password"
          onChange={updateFormulario}
          placeholder="Password"
          onBlur={() => checkError("password")}
        ></input>
        <div className="error">{errors.ePassword}</div>
        <input
          className="inputBase"
          type="string"
          name="birthday"
          onChange={updateFormulario}
          placeholder="YYYY/MM/DD"
          onBlur={() => checkError("birthday")}
        ></input>
        <div className="error">{errors.eBirthday}</div>
        <input
          className="inputBase"
          type="tel"
          name="telephone"
          onChange={updateFormulario}
          placeholder="Phone +34 000 000 000"
          onBlur={() => checkError("telephone")}
        ></input>
        <div className="error">{errors.eTelephone}</div>

        <input
          className="inputBase"
          type="string"
          name="country"
          onChange={updateFormulario}
          placeholder="country"
          onBlur={() => checkError("Country")}
        ></input>
        <div className="error">{errors.eCountry}</div>

        <input
          className="inputBase"
          type="string"
          name="city"
          onChange={updateFormulario}
          placeholder="city"
          onBlur={() => checkError("City")}
        ></input>
        <div className="error">{errors.eCity}</div>

        {/* <select
        className="inputBase"

          name="country"
          onChange={updateFormulario}
          id="opcionCountry">
            <option disabled>Country</option>
            <option value="spain">Spain</option>
        </select> */}



        {/* <select
         className="inputBase"

          name="country"
          onChange={updateFormulario}
          id="opcionCity">
            <option disabled>City</option>
            <option value="valencia" >Valencia</option>
        </select> */}
     

        
        <button
          className="botonRegister"
          type="submit"
          onClick={() => ejecutaRegistro()}
        >
          REGISTRAR
        </button>
        <div>{msgError}</div>
      </div>
      <div className="textRight">
        <p>Crea tu cuenta!</p>
        {/* <img className="imageCena" src={cena} alt="cena" /> */}
      </div>
    </div>
  );
};

export default connect((state) => ({
  credential: state.credential,
}))(Register);
