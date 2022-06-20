import './App.css';
import React from 'react';
import {useState} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar';
import { AppContext } from "./data/authContext";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>{/* all the child components inside the Context Provider can access the auth.*/}
        <Router>
          <Navbar />
        </Router>
      </AppContext.Provider>
    </>
  )
}

export default App