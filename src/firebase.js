import firebase from "firebase";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3B2KS9bWLnrmTlCuwbY-J5xKzVIVSfNc",
  authDomain: "instagram-82b33.firebaseapp.com",
  projectId: "instagram-82b33",
  storageBucket: "instagram-82b33.appspot.com",
  messagingSenderId: "173404593739",
  appId: "1:173404593739:web:466d7e944d2add8e4577ce",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = app.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
