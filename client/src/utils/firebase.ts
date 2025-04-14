// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO need to add to .env laters
const firebaseConfig = {
    apiKey: "AIzaSyDiOY_cjsSVcSuEXSvoAN2Bhs5v-5-fiUo",
    authDomain: "mealsly-49d04.firebaseapp.com",
    projectId: "mealsly-49d04",
    storageBucket: "mealsly-49d04.firebasestorage.app",
    messagingSenderId: "36699976398",
    appId: "1:36699976398:web:3dc178cbb6fe36b604169f",
    measurementId: "G-R0JZWN3Z04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);