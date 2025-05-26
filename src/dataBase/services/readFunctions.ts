import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { EventData, ProfileData, UserData } from "../../types";

/* -----> Users */
// Get all users from database
export const getUsers = async () => {
  const usersCol = collection(db, "users");
  const userSnaphot = await getDocs(usersCol);
  const usersList = userSnaphot.docs.map((doc) => doc.data());

  const typedUsers: UserData[] = usersList.map((doc) => doc as UserData);
  return typedUsers;
};

// Get a single user
export const getOneUser = async (userId: string) => {
  const userSnap = await getDoc(doc(db, "users", userId));

  if (!userSnap.exists()) {
    console.warn(`Perfil con ID ${userId} no encontrado.`);
    return null;
  }

  const typedUserSnap: UserData = userSnap.data() as UserData;
  return typedUserSnap;
};

/* -----> Profiles */
// Get all profiles from database
export const getProfiles = async () => {
  const profilesCol = collection(db, "profiles");
  const profilesSnaphot = await getDocs(profilesCol);

  //Typing profiles list
  const profilesList = profilesSnaphot.docs.map((doc) => doc.data());
  const typedProfiles: ProfileData[] = profilesList.map(
    (doc) => doc as ProfileData
  );
  return typedProfiles;
};

// Get a single profile
export const getOneProfile = async (profileId: string) => {
  const profileSnap = await getDoc(doc(db, "profiles", profileId));

  if (!profileSnap.exists()) {
    console.warn(`Perfil con ID ${profileId} no encontrado.`);
    return null;
  }

  const typedProfileSnap: ProfileData = profileSnap.data() as ProfileData;
  return typedProfileSnap;
};

// Get all the profiles created by a single user
export const getUserProfiles = async (profileUserUid: string) => {
  const ref = collection(db, "profiles");
  console.log(profileUserUid);
  const q = query(ref, where("userUid", "==", profileUserUid));
  const querySnap = await getDocs(q);
  console.log(querySnap);

  if (querySnap.empty) {
    console.warn(`No profiles found`);
    return null;
  }

  const typedQuerySnap: ProfileData[] = querySnap.docs.map(
    (doc) => doc.data() as ProfileData
  );
  return typedQuerySnap;
};

/* -----> Events */
// Get all events from database
export const getEvents = async () => {
  const eventsCol = collection(db, "events");
  const eventSnaphot = await getDocs(eventsCol);

  //Typing event list
  const eventList = eventSnaphot.docs.map((doc) => doc.data());
  const typedEvents: EventData[] = eventList.map((doc) => doc as EventData);
  return typedEvents;
};

// Get a single event
export const getOneEvent = async (eventId: string) => {
  const eventSnap = await getDoc(doc(db, "events", eventId));

  if (!eventSnap.exists()) {
    console.warn(`Perfil con ID ${eventId} no encontrado.`);
    return null;
  }

  const typedEventSnap: EventData = eventSnap.data() as EventData;
  return typedEventSnap;
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

/* -----> Limited Querys */
// Get 4 Upcoming Events
export const getUpcomingEventsLimited = async (profileId: string) => {
  const ref = collection(db, "events");
  const q = query(
    ref,
    where("profileAssistant", "array-contains", profileId),
    where("dateTime", ">=", new Date()),
    limit(4)
  );
  const querySnap = await getDocs(q);
  const typedQuerySnap: EventData[] = querySnap.docs.map(
    (doc) => doc.data() as EventData
  );
  return typedQuerySnap;
};

// Get 4 Hosted Events
export const getHostedEventsLimited = async (profileId: string) => {
  const ref = collection(db, "events");
  const q = query(ref, where("profileIdCreator", "==", profileId), limit(4));
  const querySnap = await getDocs(q);
  const typedQuerySnap: EventData[] = querySnap.docs.map(
    (doc) => doc.data() as EventData
  );
  return typedQuerySnap;
};

// Get 4 Favourite Events
export const getFavouriteEventsLimited = async (likedEvents: string[]) => {
  const likedEventsData: Promise<EventData>[] = likedEvents.map(async (id) => {
    const docSnap = await getDoc(doc(db, "events", id));
    const typedQuerySnap: EventData = docSnap.data() as EventData;
    return typedQuerySnap;
  });

  const likedEventsResult: EventData[] = await Promise.all(likedEventsData);
  const limitedLikedEvents: EventData[] = likedEventsResult.slice(0, 4);
  return limitedLikedEvents;
};

// Get 4 Past Events
export const getPastEventsLimited = async (profileId: string) => {
  const ref = collection(db, "events");
  const q = query(
    ref,
    where("profileAssistant", "array-contains", profileId),
    where("dateTime", "<=", new Date()),
    limit(4)
  );
  const querySnap = await getDocs(q);
  const typedQuerySnap: EventData[] = querySnap.docs.map(
    (doc) => doc.data() as EventData
  );
  return typedQuerySnap;
};
