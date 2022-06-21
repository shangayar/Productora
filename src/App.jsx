import './App.css';
import React from 'react';
import {useEffect} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar';
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  let isAuth;
  
  //set the cookie to false only once so that it can be removed
  useEffect(() => {
    console.log('cookie is set for the first time');
    
    setCookie("user", false, { path: "/" });
    
    isAuth = cookies.user;
  }, []);

  return (
    <>      
      <Router>
        <Navbar/>
      </Router>
    </>
  )
}

export default App