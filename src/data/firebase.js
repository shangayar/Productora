import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEEQl1A98HZ_7qNUxwZYhPxZOVhlZnsKw",
  authDomain: "mi-pagina-de-prueba.firebaseapp.com",
  databaseURL: "https://mi-pagina-de-prueba.firebaseio.com",
  projectId: "mi-pagina-de-prueba",
  storageBucket: "mi-pagina-de-prueba.appspot.com",
  messagingSenderId: "175985706124",
  appId: "1:175985706124:web:4f81151ab34d6168ef67a9",
  measurementId: "G-6BRJJXEFK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth};