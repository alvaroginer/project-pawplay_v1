import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";
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
const db: Firestore = getFirestore(app);

// Get a users from database
export async function getUsers() {
  const usersCol = collection(db, "users");
  const userSnaphot = await getDocs(usersCol);
  const userList = userSnaphot.docs.map((doc) => doc.data());
  return userList;
}

// Get a users from database
export async function getProfiles() {
  const profilesCol = collection(db, "profiles");
  const profilesSnaphot = await getDocs(profilesCol);
  const profilesList = profilesSnaphot.docs.map((doc) => doc.data());
  return profilesList;
}

// Get a users from database
// Have to update this function
export async function getEvents() {
  const eventsCol = collection(db, "events");
  const eventSnaphot = await getDocs(eventsCol);
  const eventList = eventSnaphot.docs.map((doc) => doc.data());
  return eventList;
}
