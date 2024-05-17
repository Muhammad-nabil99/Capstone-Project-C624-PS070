import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD1LxRgRqwbq9Ia82eTtb0156lpuk06mRw",
    authDomain: "capstone-project-c624-ps070.firebaseapp.com",
    projectId: "capstone-project-c624-ps070",
    storageBucket: "capstone-project-c624-ps070.appspot.com",
    messagingSenderId: "640500722269",
    appId: "1:640500722269:web:14f1b6a753ba7fef083bb4",
    measurementId: "G-3KQ1MLQJVS"
  };

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = firebase.firestore();
