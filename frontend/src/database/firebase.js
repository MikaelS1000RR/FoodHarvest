import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


var admin = require("firebase-admin");
var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



// Initialize Firebase

var config = {
  apiKey: "AIzaSyBWX3n7CSLuBKw-2J_CucCyOoaEvuZ091I",
  authDomain: "food-harvest.firebaseapp.com",
  projectId: "food-harvest",
  storageBucket: "food-harvest.appspot.com",
  messagingSenderId: "506690333919",
  appId: "1:506690333919:web:232c3c045ccb98b8edcd6a",
  measurementId: "G-38YVBRYC5J"
};

// Initialize Firebase
firebase.initializeApp(config);
const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
});

export {
  db
}