import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  databaseURL: "https://urduqa-74120-default-rtdb.firebaseio.com",
  apiKey: "AIzaSyAtlYzkULDtoHsNZ-6nqewQxmtHpZI9JKg",
  authDomain: "urduqa-6d19d.firebaseapp.com",
  projectId: "urduqa-6d19d",
  storageBucket: "urduqa-6d19d.appspot.com",
  messagingSenderId: "436954616835",
  appId: "1:436954616835:web:58e6fbad57790227302a36",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = getFirestore(firebaseApp);
export { auth, provider };
export default db;
