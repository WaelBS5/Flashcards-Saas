// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDhd95RO5uNWI2nF9MPmvQCY4Da1nJmlKU",
  authDomain: "flashcardsaas-e5324.firebaseapp.com",
  projectId: "flashcardsaas-e5324",
  storageBucket: "flashcardsaas-e5324.appspot.com",
  messagingSenderId: "781082399406",
  appId: "1:781082399406:web:aa5b4922ac6d0b889b533f",
  measurementId: "G-YRGGJEL9XG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 


// Initialize Analytics only if in a browser environment
if (typeof window !== "undefined") {
    try {
      const analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized.");
    } catch (error) {
      console.log("Firebase Analytics initialization failed:", error);
    }
  } else {
    console.log("Firebase Analytics is not supported in this environment.");
  }
  
export { db };
