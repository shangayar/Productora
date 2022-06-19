import { Button } from 'bootstrap';
import { Link } from "react-router-dom";
import '../styles/Login.css';

function Login() {
  return (
    <div className="container-login" id='login'>
        <form>
          <label className="font-weight-bold" /> User
          <input className="text-dark rounded " type="text"></input>
          <label /> Password
          <input className="text-dark rounded" type="password"></input>
          <div className="div-button-log">
            <button className="button-login">Iniciar sesión</button>
          </div>
        </form>
        <p>¿No tienes una cuenta? <Link to="/Registro">Registrate</Link></p>
    </div>
  );
}

export default Login