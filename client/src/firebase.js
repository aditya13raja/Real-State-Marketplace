// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: check if apiKey is correct or not

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "delux-estate.firebaseapp.com",
  projectId: "delux-estate",
  storageBucket: "delux-estate.appspot.com",
  messagingSenderId: "751305388732",
  appId: "1:751305388732:web:43218582967d48f1e616b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);