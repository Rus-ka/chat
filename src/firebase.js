// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIednfC0VbKoQLmM8r-zk4VeNg_88oTYA",
  authDomain: "chat-35bf9.firebaseapp.com",
  projectId: "chat-35bf9",
  storageBucket: "chat-35bf9.appspot.com",
  messagingSenderId: "292100163637",
  appId: "1:292100163637:web:6322382d90e6a78b01097c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
// export const db = getFirestore(app);