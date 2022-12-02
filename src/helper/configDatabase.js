import firebase from "firebase/app";
// import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

export function connectDatabase() {
    const firebaseConfig = {
        apiKey: "AIzaSyCi03lnEWgFK61CV32HJaPsYC8uohWG2AA",
        authDomain: "batdongsanweb.firebaseapp.com",
        projectId: "batdongsanweb",
        storageBucket: "batdongsanweb.appspot.com",
        messagingSenderId: "853795324769",
        appId: "1:853795324769:web:6128febc029646f2763b20",
        measurementId: "G-4DH9E26NJV"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("ket noi thanh cong");
    }
}