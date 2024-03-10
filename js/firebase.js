new WOW().init();

//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyBNmyBNWVU4zhyH3pou5qnSY99-Ctmv5_4",
    authDomain: "e-book-9bf33.firebaseapp.com",
    projectId: "e-book-9bf33",
    storageBucket: "e-book-9bf33.appspot.com",
    messagingSenderId: "476138538460",
    appId: "1:476138538460:web:71385f4bd8665b9edefb19",
    measurementId: "G-K4J5J03Z5C"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storageRef = firebase.storage().ref();