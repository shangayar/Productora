import { Link } from "react-router-dom";
import { useState } from 'react';
import { client, q } from '../data/db';
import BlockMsg from "../components/BlockMsg";

const Formulario = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const newLocal = false; //for BlockMsg

  let arrayEmails = [];

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
    getAllEmails();
    let searchEmail;
    console.log(arrayEmails)
    if (arrayEmails.data.find(i => i === email)) {
      searchEmail = arrayEmails.data.find(i => i === email);
    };

    e.preventDefault();
    if (email && password && name) {
      if (searchEmail === email) {
        setMsg('Esa dirección de mail ya ha sido registrada')
      } else {
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let emailValidated;
        let nameValidated;
        let passwordValidated;
        if(email.match(emailformat)){
          emailValidated=email;
        } else {
          setMsg('Ingrese un mail válido');
        }
        if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
          passwordValidated=password;
        } else {
          setMsg('Ingrese una contraseña válida. Debe contener entre 6 y 20 caracteres, un número, una letra mayúscula y una minúscula');
        }
        if(name.match(/^[a-zA-Z ]+$/)){
          nameValidated=name;
        } else {
          setMsg('El nombre sólo puede contener letras.');
        }
        if (emailValidated && nameValidated && passwordValidated) {
          client.query(
            q.Create(
              q.Collection('users'),
              { data: { name: nameValidated, email: emailValidated, password: passwordValidated} }
            )
          )
          .then((ret) => {
            console.log(ret);
            setMsg('Usuario creado exitosamente');
            setEmail("");
            setPassword("");
            setName("");
          })
          .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
          ))
        }
      }
    } else {
      setMsg('Debe completar todos los campos correctamente!')
    }
  }

  return (
    <div className="container-login" id="registro">
      {msg.length > 2 ? <BlockMsg msg={msg}/> : newLocal}
      <p>
        Crea una cuenta en Productora+. Es gratis y solo te toma un minuto
      </p>
      <form>
        <label className="font-weight-bold"> Nombre para mostrar </label>
        <input className="text-dark rounded" onChange={(e) => setName(e.target.value)} name="name" value={name} type="text"/>
        
        <label className="font-weight-bold"> Correo Electrónico </label>
        <input className="text-dark rounded" onChange={(e) => setEmail(e.target.value)} name="email" value={email} type="email"/>
        
        <label  className="font-weight-bold"> Contraseña</label>
        <input className="text-dark rounded" onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password"/>
      </form>
      <div className="div-button-log">
        <button onClick={handleSubmit} type="button" className="button-login">Registrarse</button>
      </div>
      <p>
        ¿Ya tienes Cuenta? <Link to="/IniciarSesion">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Formulario