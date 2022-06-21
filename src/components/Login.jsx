import { Button } from 'bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';
import '../styles/Login.css';
import { client, q } from '../data/db';
import { useCookies } from "react-cookie";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  let foundUser;

  function getAllUsers(userEmail){
    client.query(
      q.Get( q.Match(q.Index('searchUser_email'), userEmail) )
    )
    .then(ret => {
      foundUser = ret.data;
    })
    .catch((err) => console.error(
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description,
    ))
  }

  function isUserCorrect(userData) {
    if (email && password) {
      console.log(userData);

      if (!foundUser) {
        alert('Esa dirección de mail no ha sido registrada (bug: sólo toma el log in la segunda vez que seapreta el botón, el navbar cambia en la cuarta vez que se apreta el botón)')
      } else {
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(emailformat)){
          if (userData.email === email && userData.password === password) {
            alert('sesión iniciada');
            setCookie("user", true, { path: "/" });
            props.isAuthLogIn(cookies.user);
            setCookie("email", email, { path: "/" });
            
          } else {
            alert('El mail y la contraseña no coinciden');
          }
        } else {
          alert('Ingrese un mail válido');
        }
      }
    } else {
      alert('Debe completar todos los campos')
    }
  }
  function handleSubmit(e) {
    getAllUsers(email);
    e.preventDefault();
    isUserCorrect(foundUser);
    /*El log in funciona a la segunda vz que se manda el formulario*/
  }
  return (
    <div className="container-login" id='login'>
        <form >
          <label className="font-weight-bold" /> User
          <input className="text-dark rounded " type="text" onChange={(e) => setEmail(e.target.value)}></input>
          <label /> Password
          <input className="text-dark rounded" type="password" onChange={(e) => setPassword(e.target.value)}></input>
          <div className="div-button-log">
            <button type="button" className="button-login" onClick={handleSubmit}>Iniciar sesión</button>
          </div>
        </form>
        <p>¿No tienes una cuenta? <Link to="/Registro">Registrate</Link></p>
    </div>
  );
}

export default Login