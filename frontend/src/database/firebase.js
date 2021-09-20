import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
let config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
let myFirebase = firebase.initializeApp(config);
const db = myFirebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

export {
  db
}