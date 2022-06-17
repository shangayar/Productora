import React, { useEffect } from 'react';
import './App.css';
import db from './data/database';
import Navbar from './components/Navbar';

function App() {
  useEffect(()=> {
    const getUsers = async() => {
      const users = await getDocs(collection(db, 'users'));
      users.forEach((user) => {
        console.log(user.id + ' ' + user.name)
      });
    }
    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App