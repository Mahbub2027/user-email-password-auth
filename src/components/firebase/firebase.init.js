// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUIV5bkbQTZ85Ss8PQ2K66bwOID6rhNY8",
  authDomain: "user-email-password-3e286.firebaseapp.com",
  projectId: "user-email-password-3e286",
  storageBucket: "user-email-password-3e286.appspot.com",
  messagingSenderId: "899111711362",
  appId: "1:899111711362:web:b1b3544508745d3be0ba9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;