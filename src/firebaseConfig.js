import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (Replace with your credentials)
const firebaseConfig = {
  apiKey: "AIzaSyD9KKVLV97Uj6sKAaBpM8621uwDWL-215w",
  authDomain: "kealthy-90c55.firebaseapp.com",
  projectId: "kealthy-90c55",
  storageBucket: "kealthy-90c55.appspot.com",
  messagingSenderId: "486140167563",
  appId: "1:486140167563:web:688322367985fb85ae5b8e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
