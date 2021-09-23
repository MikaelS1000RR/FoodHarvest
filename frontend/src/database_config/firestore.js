import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Initialize Firebase
let config = {
  apiKey: "AIzaSyAq_1HKaT-Zh2isVQU_wwX-IYcmy26bKmo",
  authDomain: "food-harvest-firestore.firebaseapp.com",
  projectId: "food-harvest-firestore",
  storageBucket: "food-harvest-firestore.appspot.com",
  messagingSenderId: "60579697874",
  appId: "1:60579697874:web:8f684e8b74b111d7e2c90b",
  measurementId: "G-4XN183KB6Y"
};
firebase.initializeApp(config);

export default firebase.firestore();