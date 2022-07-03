import '../styles/Login.css';
import { useState } from 'react';
import { useCookies } from "react-cookie";
import BlockMsg from "../components/BlockMsg";

function Logout() {
    const [cookies, setCookie] = useCookies(["user"]);

    const [msg, setMsg] = useState("");
    const newLocal = false; //for BlockMsg
  
    function handleSubmit() {      
      setCookie("user", false, { path: "/" });
      setMsg('Ha cerrado la sesión correctamente. Toca dos veces para cambiar el navbar');
    }

  return (
    <div className="container-login" id='login'>
        {msg.length > 2 ? <BlockMsg msg={msg}/> : newLocal}
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