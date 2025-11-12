// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3-HlIzGPPlwDq2NwgYdmVQ2ToFEB50gQ",
  authDomain: "eco-track-bf6a1.firebaseapp.com",
  projectId: "eco-track-bf6a1",
  storageBucket: "eco-track-bf6a1.firebasestorage.app",
  messagingSenderId: "856749701887",
  appId: "1:856749701887:web:9aa332e3f6318818142aca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);