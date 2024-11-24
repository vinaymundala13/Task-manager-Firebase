// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBj0AJXWuPRs2TIX0UGlyZUBRwhS8H-A_c",
  authDomain: "react-auth-e8913.firebaseapp.com",
  projectId: "react-auth-e8913",
  storageBucket: "react-auth-e8913.appspot.com",
  messagingSenderId: "1061569421479",
  appId: "1:1061569421479:web:340121ed5db4a3c3d8fb82",
  measurementId: "G-09KMLDKHZP"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;