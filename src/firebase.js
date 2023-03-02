import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAbwTWigXhErgcBnr26l0UvtonYWrgGJ_w",
  authDomain: "urduqa-74120.firebaseapp.com",
  databaseURL: "https://urduqa-74120-default-rtdb.firebaseio.com",
  projectId: "urduqa-74120",
  storageBucket: "urduqa-74120.appspot.com",
  messagingSenderId: "817911383350",
  appId: "1:817911383350:web:6be5ee3973551a65c3df97",
  measurementId: "G-1MTTNC9W7M"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;