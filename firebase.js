// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzSaxxz5NA-jBUHxx4-nowdnxBzjHW6ME",
  authDomain: "fmiquiz.firebaseapp.com",
  projectId: "fmiquiz",
  storageBucket: "fmiquiz.appspot.com",
  messagingSenderId: "230836911880",
  appId: "1:230836911880:web:5f9cd0405904667656b6bd",
  measurementId: "G-D5GTRJ3RJ9"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = getAuth(app);

export { auth };