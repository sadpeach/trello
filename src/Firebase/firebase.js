import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDA6s78psA0Pu8wpZbP6z5SfaKSWfTXSjo",
  authDomain: "trello-950da.firebaseapp.com",
  databaseURL: "https://trello-950da-default-rtdb.firebaseio.com",
  projectId: "trello-950da",
  storageBucket: "trello-950da.appspot.com",
  messagingSenderId: "431350296730",
  appId: "1:431350296730:web:3ae065cdeb1b9d94adef23"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { firebase, db };