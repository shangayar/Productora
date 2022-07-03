import { Button } from 'bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';
import '../styles/Login.css';
import { client, q } from '../data/db';
import { useCookies } from "react-cookie";
import BlockMsg from "../components/BlockMsg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  
  let foundUser;

  const [msg, setMsg] = useState("");
  const newLocal = false; //for BlockMsg

  function validateUserByEmail(userEmail){
    client.query(
      q.Get( q.Match(q.Index('searchUser_email'), userEmail) )
    )
    .then(ret => {
      return foundUser = ret.data;
    })
    .then(foundUser => {
      isUserCorrect(foundUser)
    })
    .catch((err) => console.error(err))
  }

  function setEmailCookie(email) {
    setCookie("user", true, { path: "/" });
    setCookie("email", email, { path: "/" });//this will be read in userProfile
  }

  function isUserCorrect(userData) {
    if (email && password) {

      if (!foundUser) {
        setMsg('Esa dirección de mail no ha sido registrada')
      } else {
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(emailformat)){
          if (userData.email === email && userData.password === password) {
            setMsg('Sesión iniciada correctamente');
            setEmailCookie(email);
          } else {
            setMsg('El mail y la contraseña no coinciden');
          }
        } else {
          setMsg('Ingrese un mail válido');
        }
      }

    } else {
      setMsg('Debe completar todos los campos')
    }
  }

  const handleSubmit = () => {
    validateUserByEmail(email);
  }

  return (
    <div className="container-login" id='login'>
        {msg.length > 2 ? <BlockMsg msg={msg}/> : newLocal}
        <form >
          <label className="font-weight-bold" /> User
          <input className="text-dark rounded " type="text" onChange={(e) => setEmail(e.target.value)}></input>
          <label /> Password
          <input className="text-dark rounded" type="password" onChange={(e) => setPassword(e.target.value)}></input>
        </form>
        <div className="div-button-log">
          <button type="button" className="button-login" onClick={handleSubmit}>Iniciar sesión</button>
        </div>
        <p>¿No tienes una cuenta? <Link to="/Registro">Registrate</Link></p>
    </div>
  );
}

export default Login