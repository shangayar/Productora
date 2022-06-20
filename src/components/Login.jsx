import { Button } from 'bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';
import '../styles/Login.css';
import { useAppContext } from "../data/authContext";
import { client, q } from '../data/db';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function getAllUsers(userEmail){
    client.query(
      q.Paginate( q.Match(q.Index('searchUser_email'), userEmail) )
    )
    .then(ret => {
      console.log(ret.data);
    })
    .catch((err) => console.error(
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description,
    ))
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) {
      let userEmail = email;
      const foundUser= getAllUsers(userEmail);
      if (foundUser < 0 ) { /*ARREGLAR ESTO, NO TIENE SENTIDO*/
        alert('Esa dirección de mail no ha sido registrada')
      } else {
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(emailformat)){
          console.log(foundUser);
          let userPass = q.Select(['data', 'password'], q.Get(q.Var(password)));
           /*COMO AGARRO LA PASS DESDE ESTE REF?*/
           console.log(userPass);
          alert('sesión iniciada');
        } else {
          alert('Ingrese un mail válido');
        }
      }
    } else {
      alert('Debe completar todos los campos')
    }
  }
  const { userHasAuthenticated } = useAppContext();

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