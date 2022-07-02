import React from 'react';
import { useState, useEffect} from 'react';
import { useCookies } from "react-cookie";
import { BiTrash } from "react-icons/bi";
import {IoMdClose} from "react-icons/io";

import '../styles/userProfile.css';

import { client, q } from '../data/db';

export default function Profile() {
    const [cookies, setCookie] = useCookies(["email"]);
    const userEmail = cookies.email;
    let userData;
    useEffect(() => {
        userData = getUserData();
    }, []);
    
    function getUserData() {
        client.query(
            q.Get( q.Match(q.Index('searchUser_email'), userEmail) )
        )
        .then((ret) => {
            userData = ret.data
            setName(ret.data.name);
        })
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
    }
    
    let [userName, setName] = useState();
    let [userLastName, setLastName] = useState('apellido');
    let [userPic, setPic] = useState('https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/nonUser.png');
    
    const userNameSeleccionado = function(e){
        setName(e.target.value);
    };
    const userLastNameSeleccionado = function(e){
        setLastName(e.target.value);
    };

        /*Upload and delete user pic   
        const FileUploader = () => {
            const handleFileInput = () => {}
        
            return (
                <div className="file-uploader">
                    <input type="file" onChange={handleFileInput} ></input>
                </div>
            )
        }*/
    function userPicSeleccionado (e){
        const imgPath = e.target.value.split(/[\\/]/);
        const imgName = imgPath.at(-1)
        setPic(imgName);
        displayPicModal();
    }; 
    function userPicEliminado(){
        displaylDeletePicModal();
        setPic('nonUser.png');
    };

    /*Modal / overlay*/
    var modalForPic = document.getElementById('modalForPic');
    window.addEventListener('click', clickOutsideModal); 
    function displayPicModal() {
        if (modalForPic.style.display == "none") {
            modalForPic.style.display = "flex";
        } else {
            modalForPic.style.display="none"
        }
    } function clickOutsideModal(evento){
        if(evento.target == modalForPic){
            modalForPic.style.display = "none";
        }
    }

    var modalForSession = document.getElementById('modalForSession');
    window.addEventListener('click', clickOutsideModalSession); 
    function clickOutsideModalSession(e){
        if(e.target == modalForSession){
            modalForSession.style.display = "none";
        }
    }
    
    var modalForExit = document.getElementById('modalForExit');
    window.addEventListener('click', clickOutsideModalExit); 
    function displayExitModal() {
        if (modalForExit.style.display == "none") {
            modalForExit.style.display = "flex";
        } else {
            modalForExit.style.display="none"
        }
    } function clickOutsideModalExit(e){
        if(e.target == modalForExit){
            modalForExit.style.display = "none";
        }
    }

    var modalDeletePic = document.getElementById('modalDeletePic');
    window.addEventListener('click', clickOutsideModalExit); 
    function displaylDeletePicModal() {
        if (modalDeletePic.style.display == "none") {
            modalDeletePic.style.display = "flex";
        } else {
            modalDeletePic.style.display="none"
        }
    } function clickOutsideModalExit(e){
        if(e.target.modalDeletePic){
            modalDeletePic.style.display = "none";
        }
    }
    const datosUser = Users;

    return (
        <div id='#userProfile_body'>
            <div className='container blanco' id='perfilSection'>
                <section className='col-sm-12 col-md-5 col-lg-6'>
                    <p className='encabezadoSize blanco capitalize'>{userName} {userLastName}</p>
                    <article onClick={displaylDeletePicModal}> 
                        <img src={userPic} id="imgProfile" alt="Foto de perfil" onError={userPicEliminado} /> {/*"src/img/" + userPic*/}
                        <button><BiTrash style={ {fill: "#121212", fontSize:"1.5rem",} }></BiTrash></button>
                    </article>
                    <button onClick={displayPicModal}className='btnVioletaRedondo'>Cambiar foto</button>
                    <div>
                        <button onClick={displayExitModal}>Cerrar sesión</button>
                    </div>
                </section>

                <section className='col-sm-12 col-md-7 col-lg-6'>
                    <p className='encabezadoSize blanco'>Configuración de la cuenta</p>
                    <form action="" method='post' id='formProfileEdit'>
                        <h5>Nombre y apellido:</h5>
                        <fieldset>
                            <div>
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" className='capitalize' autoComplete='given-name' onChange={userNameSeleccionado} placeholder={userName} name="nombre" />
                            </div>
                            <div>
                                <label htmlFor="apellido">Apellido</label>
                                <input type="text" className='capitalize' autoComplete='family-name' onChange={userLastNameSeleccionado} placeholder={userLastName} name="apellido" />
                            </div>
                        </fieldset>
                        <h5>Cambiar contraseña:</h5>
                        <fieldset>
                            <div>
                                <label htmlFor="pass">Nueva contraseña</label>
                                <input type="password" autoComplete='on' minLength="6" name="new-password" />
                            </div>
                            <div>
                                <label htmlFor="confirmPass">Confirmar contraseña</label>
                                <input type="password" autoComplete='off' name="confirm_new-password" />
                            </div>
                        </fieldset>
                        <h5>Sus datos actuales:</h5>
                        <fieldset>
                            <div>
                                <label htmlFor="email">Correo electrónico</label>
                                <input type="email" placeholder={userEmail} name="email" disabled/>
                            </div>
                            <div>
                                <label htmlFor="pass">Contraseña actual</label>
                                <input type="password" autoComplete='new-password' minLength="6" name="pass" />
                            </div>
                        </fieldset> 
                        <button type="button" className="btnVioletaRedondo">Guardar cambios</button>{ /* onClick={updateUserData}*/}
                    </form>
                </section>
            </div>
            {/*Modal / Overlays*/}
            <section id='modalForPic' className='modalOverlay'>
                <article>
                    <div><button onClick={displayPicModal}><IoMdClose style={ {fill: "var(--white)", fontSize:"1.5rem",} }></IoMdClose></button></div>
                    <label htmlFor="userPicture">Seleccioná una foto de perfil</label>
                    <input type="file" name="userPicture" accept="image/png, image/jpeg, image/jpg" onChange={userPicSeleccionado}/>
                </article>
            </section>
            <section id='modalForExit' className='modalOverlay'>
                <article>
                    <div><button onClick={displayExitModal}><IoMdClose style={ {fill: "var(--white)", fontSize:"1.5rem",} }></IoMdClose></button></div>
                    <p className='encabezadoModal'>¿Desea cerrar sesión?</p>
                    <div>
                        <button className='btnVioletaRedondo'>Sí, cerrar sesión</button>
                        <button className='btnSecundario' onClick={displayExitModal}>Cancelar</button>
                    </div>
                </article>
            </section>
            <section id='modalDeletePic' className='modalOverlay'>
                <article>
                    <div><button onClick={displaylDeletePicModal}><IoMdClose style={ {fill: "var(--white)", fontSize:"1.5rem",} }></IoMdClose></button></div>
                    <p className='encabezadoModal'>¿Quiere eliminar su foto de perfil?</p>
                    <div>
                        <button onClick={userPicEliminado} className='btnVioletaRedondo'>Sí, eliminarla</button>
                        <button className='btnSecundario' onClick={displaylDeletePicModal}>Cancelar</button>
                    </div>
                </article>
            </section>
        </div>
    )
}