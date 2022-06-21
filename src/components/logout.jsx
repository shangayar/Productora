import '../styles/Login.css';
import { client, q } from '../data/db';
import { useCookies } from "react-cookie";

function Logout(props) {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    function handleSubmit(e) {
        alert('Ha cerrado la sesión con éxito(bug: el navbar cambia recién la segunda vez que se apreta el botón)');
        setCookie("user", false, { path: "/" });
        props.isAuthLogOut(cookies.user);
        removeCookie("email");

    }


  return (
    <div className="container-login" id='login'>
        <form >
          <label className="font-weight-bold" /> ¿Desea cerrar sesión?
          <input type="hidden"></input>
          <div className="div-button-log">
            <button type="button" className="button-login" onClick={handleSubmit}>Cerrar sesión</button>
          </div>
        </form>
    </div>
  );
}

export default Logout