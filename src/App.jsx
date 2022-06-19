import './App.css';
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  console.log('AAAAAAAAAAAAAAAA');
  return (
    <>
      <Router>
        <Navbar />
      </Router>
    </>
  )
}

export default App