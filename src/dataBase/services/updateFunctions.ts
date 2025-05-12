import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";

/* -----> Profile Updates */
// Give like to an event
export const likeEvent = async (profileId: string, eventId: string) => {
  await updateDoc(doc(db, "profiles", profileId), {
    likedEvents: arrayUnion(eventId),
  });
};

// Give dislike to an event
export const disLikeEvent = async (profileId: string, eventId: string) => {
  await updateDoc(doc(db, "profiles", profileId), {
    likedEvents: arrayRemove(eventId),
  });
};

/* -----> Event Updates */
// Joining an event
export const eventSignUp = async (profileId: string, eventId: string) => {
  await updateDoc(doc(db, "events", eventId), {
    profileIdAsisstant: arrayUnion(profileId),
  });
};

//Not joining an event
export const eventUnregister = async (profileId: string, eventId: string) => {
  await updateDoc(doc(db, "events", eventId), {
    profileIdAsisstant: arrayRemove(profileId),
  });
};
