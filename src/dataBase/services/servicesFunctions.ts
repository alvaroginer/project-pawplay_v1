import { collection, getDocs } from "firebase/firestore";
import { db } from "../../dataBase/firebase";

// Get users from database
export async function getUsers() {
  const usersCol = collection(db, "users");
  const userSnaphot = await getDocs(usersCol);
  const userList = userSnaphot.docs.map((doc) => doc.data());
  return userList;
}

// Get profiles from database
export async function getProfiles() {
  const profilesCol = collection(db, "profiles");
  const profilesSnaphot = await getDocs(profilesCol);
  const profilesList = profilesSnaphot.docs.map((doc) => doc.data());
  return profilesList;
}

// Get events from database
// Have to update this function
export async function getEvents() {
  const eventsCol = collection(db, "events");
  const eventSnaphot = await getDocs(eventsCol);
  const eventList = eventSnaphot.docs.map((doc) => doc.data());
  return eventList;
}
