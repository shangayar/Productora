import React from 'react';
import {useEffect, useState} from 'react';

import { Route, Routes, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import Homepage from '../components/Homepage'
import Login from '../components/Login'
import Logout from '../components/logout'
import SearchPage from '../components/SearchPage'
import UserProfile from '../components/UserProfile'
import Formulario from '../components/FormularioRegistro'
import Nosotros from '../components/Nosotros'

import { AiFillInstagram } from "react-icons/ai";
import {ImYoutube} from "react-icons/im";
import {FaFacebookSquare} from "react-icons/fa";
import {FaSearch} from "react-icons/fa";

function openMenu(){
    const navBar__hamburger = document.querySelector(".navBar__hamburger");
    const navBar__menu = document.querySelector(".navBar__menu");
    navBar__hamburger.classList.toggle("active");
    navBar__menu.classList.toggle("active");
};

function Footer(){
    return(
        <>
            <footer>
                <section>
                    <div>
                        <p>Grupo 4 - React #22014</p>
                    </div>
                    <ul>
                        <li>Seguinos</li>
                        <li><a href="https://www.instagram.com/" target='_blank'><AiFillInstagram style={ {fill: "#fafafa", fontSize:"1.2rem"} } /></a></li>
                        <li><a href="https://www.youtube.com/" target='_blank'><ImYoutube style={ {fill: "#fafafa", fontSize:"1.2rem"} } /></a></li>
                        <li><a href="https://www.facebook.com/" target='_blank'><FaFacebookSquare style={ {fill: "#fafafa", fontSize:"1.2rem"} } /></a></li>
                    </ul>
                </section>                
                <section>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/Nosotros">Nosotros</Link></li>
                        <li><Link to="/Buscar">Búsqueda</Link></li>
                        <li><Link to="/Perfil">Perfil</Link></li>
                    </ul>
                </section>
            </footer>
        </>
    )
}

function Navbar(){
    const [isAuth, setisAuth] = useState('');
    
    const isAuthLogIn = (data) => { console.log('child says' + data);  setisAuth(data) }
    const isAuthLogOut = (data) => { console.log('child says' + data); setisAuth(data) }
  
    const [cookies] = useCookies(["user"]);

    useEffect(() => {
        console.log('cookie is reloaded');
        console.log(isAuth);
    }, [isAuth]);
    console.log('AAAAA' + isAuth);

    return(
        <>
            <nav className='navBar'>
                <div>
                    <Link to="/"  id='navbarLogo'>
                        <div><img src="https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/logoProductora.svg" alt=""/></div> 
                        <p>React #22014</p>
                    </Link>
                </div>
                <ul className="navBar__menu">
                    <li><Link to="/Buscar"><button id="btnSearch"><FaSearch style={ {fill: "#fafafa", fontSize:"1.5rem"} } /></button></Link></li>
                    <li><a href="https://www.instagram.com/" target='_blank'><AiFillInstagram style={ {fill: "#fafafa", fontSize:"1.5rem"} } /></a></li>
                    <li><a href="https://www.youtube.com/" target='_blank'><ImYoutube style={ {fill: "#fafafa", fontSize:"1.5rem"} } /></a></li>
                    <li><a href="https://www.facebook.com/" target='_blank'><FaFacebookSquare style={ {fill: "#fafafa", fontSize:"1.5rem"} } /></a></li>
                    { isAuth==='true'
                        ? <li><Link to="/CerrarSesion">{console.log('im the true' + isAuth)}<button className='btnVioletaRedondo'>Log out</button></Link></li>
                        : <li><Link to="/IniciarSesion">{console.log('im the false' + isAuth)}<button className='btnVioletaRedondo'>Log In</button></Link></li>
                    }
                </ul>
                <div>
                    <div className="navBar__hamburger" onClick={openMenu}>
                        <span className="hamburger--bar"></span>
                        <span className="hamburger--bar"></span>
                        <span className="hamburger--bar"></span>
                    </div>         
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<Homepage></Homepage>}>
                </Route>
                <Route path="/Nosotros" element={<Nosotros></Nosotros>}>
                </Route>
                <Route path="/Registro" element={<Formulario/>}>
                </Route>
                <Route path="/Buscar" element={<SearchPage />}>
                </Route>
                <Route path="/IniciarSesion" element={<Login isAuthLogIn={isAuthLogIn}/>}>
                </Route>
                <Route path="/Perfil" element={<UserProfile />}>
                </Route>
                <Route path="/CerrarSesion" element={<Logout isAuthLogOut={isAuthLogOut}/>}>
                </Route>
            </Routes>
            <Footer></Footer>
        </>
    )
}
export default Navbar;