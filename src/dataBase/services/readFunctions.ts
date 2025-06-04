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
import {
  EventData,
  ProfileData,
  UserData,
  completeProfileRating,
} from "../../types";

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

// Get all profiles from one user
export const getProfilesFromUser = async (userUid: string) => {
  const ref = collection(db, "profiles");
  const q = query(ref, where("userUid", "==", userUid));
  const querySnap = await getDocs(q);
  if (!querySnap) {
    console.error(`No profiles with userUid ${userUid}`);
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
// Get Events in Home Page
//No creado por perfil
//No apuntado
//Sin like
//Fecha actualizada
export const getHomePageEvents = async (
  profileId: string,
  profileLikedEvents: string[]
) => {
  const ref = collection(db, "events");
  const q = query(
    ref,
    where("dateTime", ">=", new Date()),
    where("profileIdCreator", "!=", profileId)
  );
  const querySnap = await getDocs(q);
  const typedQuerySnap: EventData[] = querySnap.docs.map(
    (doc) => doc.data() as EventData
  );

  const filteredTypedEvents = typedQuerySnap.filter((event) => {
    if (event.profileIdAsisstant?.includes(profileId)) return false;

    if (profileLikedEvents.includes(event.id)) return false;

    return true;
  });
  return filteredTypedEvents;
};

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

// Get 5 Similar Events
export const getSimilarEventsLimited = async (eventActivity: string) => {
  const ref = collection(db, "events");
  const q = query(ref, where("activity", "==", eventActivity), limit(5));
  const querySnap = await getDocs(q);

  if (!querySnap) {
    console.error("No similar events found ");
    return null;
  }
  const typedQuerySnap: EventData[] = querySnap.docs.map(
    (doc) => doc.data() as EventData
  );
  return typedQuerySnap;
};
/* -----> Rating */
// Get a single rating
export const getOneProfileRating = async (profileId: string) => {
  const querySnap = await getDoc(doc(db, "ratings", profileId));

  if (!querySnap.exists()) {
    console.warn(`Perfil con ID ${profileId} no encontrado.`);
    return null;
  }

  const typedEventSnap: completeProfileRating =
    querySnap.data() as completeProfileRating;

  return typedEventSnap;
};
