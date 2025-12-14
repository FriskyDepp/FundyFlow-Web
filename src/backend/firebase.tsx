import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEhMTMCJqN4EtyNV7XFZ50sIIlrh-N9XM",
  authDomain: "fundyflow-de261.firebaseapp.com",
  projectId: "fundyflow-de261",
  storageBucket: "fundyflow-de261.firebasestorage.app",
  messagingSenderId: "7982377623",
  appId: "1:7982377623:web:3cba72592e103c802e17d2",
  measurementId: "G-VJDTXQ103Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
