import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";

/* -----> Users */
// Get users from database
export const getUsers = async () => {
  const usersCol = collection(db, "users");
  const userSnaphot = await getDocs(usersCol);
  const userList = userSnaphot.docs.map((doc) => doc.data());
  return userList;
};

/* -----> Profiles */
// Get profiles from database
export const getProfiles = async () => {
  const profilesCol = collection(db, "profiles");
  const profilesSnaphot = await getDocs(profilesCol);
  const profilesList = profilesSnaphot.docs.map((doc) => doc.data());
  return profilesList;
};

// Get a single profile
export const getOneProfile = async (profileId: string) => {
  const profileSnap = await getDoc(doc(db, "profiles", profileId));
  return profileSnap;
};

/* -----> Events */
// Get events from database
export const getEvents = async () => {
  const eventsCol = collection(db, "events");
  const eventSnaphot = await getDocs(eventsCol);
  const eventList = eventSnaphot.docs.map((doc) => doc.data());
  return eventList;
};

// Get a single event
export const getOneEvent = async (eventId: string) => {
  const eventSnap = await getDoc(doc(db, "events", eventId));
  return eventSnap;
};
