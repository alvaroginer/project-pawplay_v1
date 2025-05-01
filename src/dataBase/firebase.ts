import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZlSPwfcKQ_BZdPthaqRbzHVDECZerJNU",
  authDomain: "pawplaydb.firebaseapp.com",
  projectId: "pawplaydb",
  storageBucket: "pawplaydb.firebasestorage.app",
  messagingSenderId: "150671458148",
  appId: "1:150671458148:web:8e5f4f08a30c48b9158471",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
