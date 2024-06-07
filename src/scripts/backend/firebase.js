const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyD1LxRgRqwbq9Ia82eTtb0156lpuk06mRw",
  authDomain: "capstone-project-c624-ps070.appspot.com",
  projectId: "capstone-project-c624-ps070",
  storageBucket: "capstone-project-c624-ps070.appspot.com",
  messagingSenderId: "640500722269",
  appId: "1:640500722269:web:14f1b6a753ba7fef083bb4",
  measurementId: "G-3KQ1MLQJVS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

module.exports = { db, storage };
