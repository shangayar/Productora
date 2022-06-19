import React from "react";
import { useState, useContext} from 'react';
import { UserContext } from '../data/UserContext'

const Formulario = () => {
  const [email, setEmail] = useState("default@default.com");
  const [password, setPassword] = useState("1234567");
  const [name, setName] = useState("Default");
  
  const {createUser} = useContext(UserContext);
  
  const handleRegister = async(e) => {
    e.preventDefault();
    console.log('Datos registrados: ', email, password)
    try{
      await createUser(email, password)
    } catch(error){console.log(error)}
  }
  
  return (
    <div className="container-login" id="registro">
      <p>
        Crea una cuenta en Productora+. Es gratis y solo te toma un minuto
      </p>
      <form onSubmit={handleRegister}>
        <label className="font-weight-bold" /> Nombre para mostrar
        <input className="text-dark rounded" onChange={(e) => setName(e.target.value)} name="name" value={name} type="text"></input>
        <label className="font-weight-bold" /> Correo Electrónico
        <input className="text-dark rounded" onChange={(e) => setEmail(e.target.value)} name="email" value={email} type="text"></input>
        <label /> Contraseña
        <input className="text-dark rounded" onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password"></input>
        <div className="div-button-log">
          <button type="submit" className="button-login">Registrarse</button>
        </div>
      </form>
      <p>
        ¿Ya tienes Cuenta? <a href="/IniciarSesion">Inicia sesión</a>
      </p>
    </div>
  );
}

export default Formulario