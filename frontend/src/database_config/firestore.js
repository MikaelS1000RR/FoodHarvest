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

// backup db
const backupConfig = {
  apiKey: "AIzaSyAeYJOOJbUDgnh_m86WKphuY5ntAilt8k8",
  authDomain: "food-harvester-firebase-backup.firebaseapp.com",
  projectId: "food-harvester-firebase-backup",
  storageBucket: "food-harvester-firebase-backup.appspot.com",
  messagingSenderId: "860549266983",
  appId: "1:860549266983:web:4cbe3cf5dc1b45d6ffd802",
};
const backupConfig2 = {
  apiKey: "AIzaSyB4LXsCA_GmiHDc6J5gt-Qv-DsWYL3VXpc",
  authDomain: "food-harvest-firestore-backup2.firebaseapp.com",
  projectId: "food-harvest-firestore-backup2",
  storageBucket: "food-harvest-firestore-backup2.appspot.com",
  messagingSenderId: "276857637753",
  appId: "1:276857637753:web:643aa13fcb484427633da8",
};


const app = firebase.initializeApp(config);

export const auth = app.auth();
export default firebase.firestore();

