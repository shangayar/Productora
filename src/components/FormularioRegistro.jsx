import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { client, q } from '../data/db';

const Formulario = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let arrayEmails = [];
  getAllEmails();

  function getAllEmails(){
    client.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('all_users')
          )
        ), 
        q.Lambda(email, q.Select(['data', 'email'], q.Get(q.Var(email))))
      )
    )
    .then(allEmails => {
      arrayEmails=allEmails;
    })
    .catch(error => console.warn('error', error.message))
  }
  function handleSubmit(e) {
    let searchEmail = arrayEmails.data.find(i => i === email);

    e.preventDefault();
    if (email && password && name) {
      if (searchEmail === email) {
        alert('Esa dirección de mail ya ha sido registrada')
      } else {
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let emailValidated;
        let nameValidated;
        let passwordValidated;
        if(email.match(emailformat)){
          emailValidated=email;
        } else {
          alert('Ingrese un mail válido');
        }
        if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
          passwordValidated=password;
        } else {
          alert('Ingrese una contraseña válida. Debe contener 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter');
        }
        if(name.match(/^[a-zA-Z ]+$/)){
          nameValidated=name;
        } else {
          alert('El nombre sólo puede contener letras. No puede contener números ni caracteres especiales');
        }
        if (emailValidated && nameValidated && passwordValidated) {
          client.query(
            q.Create(
              q.Collection('users'),
              { data: { name: nameValidated, email: emailValidated, password: passwordValidated} }
            )
          )
          .then((ret) => {console.log(ret);})
          .then ( () =>{ alert('Usuario creado exitosamente'); location.reload();} )
          .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
          ))
        }
      }
    } else {
      alert('Debe completar todos los campos correctamente!')
    }
  }

  return (
    <div className="container-login" id="registro">
      <p>
        Crea una cuenta en Productora+. Es gratis y solo te toma un minuto
      </p>
      <form onSubmit={handleSubmit}>
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
        ¿Ya tienes Cuenta? <Link to="/IniciarSesion">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Formulario