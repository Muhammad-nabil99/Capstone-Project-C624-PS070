// Import Firebase App module
const { initializeApp } = require('firebase/app');

// Import Firestore and Storage modules
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1LxRgRqwbq9Ia82eTtb0156lpuk06mRw",
  authDomain: "capstone-project-c624-ps070.firebaseapp.com",
  projectId: "capstone-project-c624-ps070",
  storageBucket: "capstone-project-c624-ps070.appspot.com",
  messagingSenderId: "640500722269",
  appId: "1:640500722269:web:14f1b6a753ba7fef083bb4",
  measurementId: "G-3KQ1MLQJVS"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Export Firestore and Storage instances
module.exports = { db, storage };
