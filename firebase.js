// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOhwDndnEB-8CHzoy7lzgoOF9udiWjuy0",
  authDomain: "inventory-management-a301f.firebaseapp.com",
  projectId: "inventory-management-a301f",
  storageBucket: "inventory-management-a301f.appspot.com",
  messagingSenderId: "860818366674",
  appId: "1:860818366674:web:bceebb11e0698100230d0b",
  measurementId: "G-NHEC0H42XG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}