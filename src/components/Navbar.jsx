import React from 'react';
import {useEffect, useState} from 'react';

import { Route, Routes, Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import SearchPage from '../pages/SearchPage'
import MoviePage from '../pages/MoviePage'
import UserProfile from '../pages/UserProfile'
import Formulario from '../pages/FormularioRegistro'
import Nosotros from '../pages/Nosotros'

import { AiFillInstagram } from "react-icons/ai";
import {ImYoutube} from "react-icons/im";
import {FaFacebookSquare, FaSearch} from "react-icons/fa";
import {HiUser} from "react-icons/hi";

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
                    </ul>
                </section>
            </footer>
        </>
    )
}

function Navbar(){
    const [cookies] = useCookies(["user"]);
    const [isAuth, setisAuth] = useState(false);
    
    useEffect(() => {
        console.log('cookie was reloaded');
        setisAuth(cookies.user)
    }, [cookies.user]);

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
                        ? <li><Link to="/Perfil"><HiUser style={ {fill: "#fafafa", fontSize:"1.5rem"} }></HiUser></Link></li>
                        : false
                    }
                    { isAuth==='true'
                        ? <li><Link to="/CerrarSesion"><button className='btnVioletaRedondo'>Log out</button></Link></li>
                        : <li><Link to="/IniciarSesion"><button className='btnVioletaRedondo'>Log In</button></Link></li>
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
                <Route path="/" element={<Homepage></Homepage>}/>
                <Route path="/Nosotros" element={<Nosotros></Nosotros>}/>
                <Route path="/Registro" element={<Formulario/>}/>
                <Route path="/Buscar" element={<SearchPage />} />
                <Route path="/IniciarSesion" element={<Login />} />
                <Route path="/Peliculas/:id" element={<MoviePage />} />
                <Route path="/Perfil" element={<UserProfile />}/>
                <Route path="/CerrarSesion" element={<Logout />}/>
            </Routes>
            <Footer></Footer>
        </>
    )
}
export default Navbar;