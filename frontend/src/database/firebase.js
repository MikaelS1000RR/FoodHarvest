import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


// Initialize Firebase

const app = initializeApp({
  apiKey: "AIzaSyBWX3n7CSLuBKw-2J_CucCyOoaEvuZ091I",
  authDomain: "food-harvest.firebaseapp.com",
  projectId: "food-harvest",
  storageBucket: "food-harvest.appspot.com",
  messagingSenderId: "506690333919",
  appId: "1:506690333919:web:232c3c045ccb98b8edcd6a",
  measurementId: "G-38YVBRYC5J"
});

// Initialize Firebase
const db = getDatabase();

db.settings({
  timestampsInSnapshots: true
});

export {
  db
}