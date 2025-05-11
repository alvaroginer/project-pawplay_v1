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
