import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";



// irebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-sw9rVGUjZOSFltof1Th7FuIA6AHQpr4",
  authDomain: "expense-tracker-b920f.firebaseapp.com",
  projectId: "expense-tracker-b920f",
  storageBucket: "expense-tracker-b920f.appspot.com",
  messagingSenderId: "355245583894",
  appId: "1:355245583894:web:b1fac90350671c7b1a4f37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)