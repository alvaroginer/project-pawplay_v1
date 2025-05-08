import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { EventData } from "../../types";

/* -----> Users */
// Get users from database
export const getUsers = async () => {
  const usersCol = collection(db, "users");
  const userSnaphot = await getDocs(usersCol);
  const userList = userSnaphot.docs.map((doc) => doc.data());
  return userList;
};

// Get a single user
export const getOneUser = async (userId: string) => {
  const userSnap = await getDoc(doc(db, "users", userId));
  return userSnap;
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

/* -----> Event Querys */
// Get Upcoming Events
export const getUpcomingEvents = async (profileId: string) => {
  const ref = collection(db, "events");
  const q = query(
    ref,
    where("profileAssistant", "array-contains", profileId),
    where("dateTime", ">=", new Date())
  );
  const querySnap = await getDocs(q);
  const typedQuerySnap: EventData[] = querySnap.docs.map(
    (doc) => doc.data() as EventData
  );
  return typedQuerySnap;
};

// Get Hosted Events
export const getHostedEvents = async (profileId: string) => {
  const ref = collection(db, "events");
  const q = query(ref, where("profileIdCreator", "==", profileId));
  const querySnap = await getDocs(q);
  const typedQuerySnap: EventData[] = querySnap.docs.map(
    (doc) => doc.data() as EventData
  );
  return typedQuerySnap;
};

// Get Favourite Events
export const getFavouriteEvents = async (likedEvents: string[]) => {
  const likedEventsData: Promise<EventData>[] = likedEvents.map(async (id) => {
    const docSnap = await getDoc(doc(db, "events", id));
    const typedQuerySnap: EventData = docSnap.data() as EventData;
    return typedQuerySnap;
  });

  const likedEventsResult: EventData[] = await Promise.all(likedEventsData);
  return likedEventsResult;
};

// Get Past Events
export const getPastEvents = async (profileId: string) => {
  const ref = collection(db, "events");
  const q = query(
    ref,
    where("profileAssistant", "array-contains", profileId),
    where("dateTime", "<=", new Date())
  );
  const querySnap = await getDocs(q);
  const typedQuerySnap: EventData[] = querySnap.docs.map(
    (doc) => doc.data() as EventData
  );
  return typedQuerySnap;
};
