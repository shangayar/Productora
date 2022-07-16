import React from 'react';
import { useState, useEffect} from 'react';
import { useCookies } from "react-cookie";
import { BiTrash } from "react-icons/bi";
import {IoMdClose} from "react-icons/io";

import '../styles/userProfile.css';
import BlockMsg from "../components/BlockMsg";

import { client, q } from '../data/db';

export default function Profile() {
    const newLocal = false; //for BlockMsg
    const [msg, setMsg] = useState("");
    const [userData, setuserData] = useState([]);
    const [userRef, setuserRef] = useState([]);
    const [cookies] = useCookies(["email"]);
    const userEmail = cookies.email; 
    useEffect(() => {
        getUserData();
        console.log(userRef)
    }, []);
    console.log(userData)
    
    function getUserData() {
        client.query(
            q.Get( q.Match(q.Index('searchUser_email'), userEmail) )
        )
        .then((ret) => {
            setuserRef(ret.ref.value.id);
            setName(userData.name);
            setuserData(ret.data);
        })
        .catch((err) => console.error(
            'Error: [%s] %s: %s',
            err.name,
            err.message,
            err.errors()[0].description,
        ))
    }
    
    let [userName, setName] = useState('');
    let [password, setPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    let [userPic, setPic] = useState('https://martinafernandezsuarez.com.ar/img/imagenesUnreleated/nonUser.png');

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

    //Update Data
    function updateUserData() {
        let finalPass;
        if (newPassword) {
            if (newPassword === newPasswordConfirm) {
                finalPass = newPassword;
            console.log(password)
            console.log(userData.password)
            console.log(userEmail)
            console.log(userData.email)
            } else {
                console.log('no coinciden')

                setMsg('Las nuevas contraseñas no coinciden')
            }
        } else {
            finalPass = password;
            setMsg('Las contraseñas coinciden')
            console.log('no cambia')
        }
        if (password === userData.password && userEmail === userData.email ) {
                setMsg('Los datos fueron modificados correctamente')
                console.log('pass ' + password)
            client.query(
                q.Replace(q.Ref(q.Collection('users'), userRef),
                    { data: { name: userName, password: finalPass, email: userEmail }, }, 
                )
            )
            .then((ret) => {
            console.log('llega a ret')
            console.log(ret);
            })
            .catch((err) => console.error(
                'Error: [%s] %s: %s',
                err.name,
                err.message,
                err.errors()[0].description,
            ))
        }
    }

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

    return (
        <div id='#userProfile_body'>
            {msg.length > 2 ? <BlockMsg msg={msg}/> : newLocal}
            <div className='container blanco' id='perfilSection'>
                <section className='col-sm-12 col-md-5 col-lg-6'>
                    <p className='encabezadoSize blanco capitalize'>{userName}</p>
                    <article onClick={displaylDeletePicModal}> 
                        <img src={userPic} id="imgProfile" alt="Foto de perfil" onError={userPicEliminado} /> {/*"src/img/" + userPic*/}
                        <button><BiTrash style={ {fill: "#121212", fontSize:"1.5rem",} }></BiTrash></button>
                    </article>
                    <button onClick={displayPicModal}className='btnVioletaRedondo'>Cambiar foto</button>
                </section>

                <section className='col-sm-12 col-md-7 col-lg-6'>
                    <p className='encabezadoSize blanco'>Configuración de la cuenta</p>
                    <form action="" method='post' id='formProfileEdit'>
                        <h5>Nombre y apellido:</h5>
                        <fieldset>
                            <div>
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" className='capitalize' autoComplete='name' onChange={(e) => setName(e.target.value)} placeholder={userName} name="nombre" />
                            </div>
                        </fieldset>
                        <h5>Cambiar contraseña:</h5>
                        <fieldset>
                            <div>
                                <label htmlFor="new-password">Nueva contraseña</label>
                                <input onChange={(e) => setNewPassword(e.target.value)} type="password" autoComplete='off' minLength="6" name="new-password" />
                            </div>
                            <div>
                                <label htmlFor="confirm_new-password">Confirmar contraseña</label>
                                <input onChange={(e) => setNewPasswordConfirm(e.target.value)} type="password" autoComplete='off' name="confirm_new-password" />
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
                                <input onChange={(e) => setPassword(e.target.value)} type="password" autoComplete='off' minLength="5" name="pass" />
                            </div>
                        </fieldset> 
                        <button onClick={updateUserData} type="button" className="btnVioletaRedondo">Guardar cambios</button>
                    </form>
                </section>
            </div>
            {/*Modal / Overlays*/}
            <section id='modalForPic' className='modalOverlay'>
                <article>
                    <div><button onClick={displayPicModal}><IoMdClose style={ {fill: "var(--white)", fontSize:"1.5rem",} }></IoMdClose></button></div>
                    <label htmlFor="userPicture">Seleccioná una foto de perfil(esto no es funcional)</label>
                    <input type="file" name="userPicture" accept="image/png, image/jpeg, image/jpg" onChange={userPicSeleccionado}/>
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