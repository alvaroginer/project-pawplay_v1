import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { RatingProps } from "../../types";
import { db } from "../firebase";

/* -----> User Updates */
export const updateUserProfiles = async (
  userUid: string,
  newProfileId: string
) => {
  await updateDoc(doc(db, "users", userUid), {
    profiles: arrayUnion(newProfileId),
  });
};

/* -----> Profile Updates */
// Profile Updates for string or number types
export const updateProfileCategoryDB = async (
  profileId: string,
  categoryName: string,
  newInfo: string | number
) => {
  await updateDoc(doc(db, "profiles", profileId), {
    [categoryName]: newInfo,
  });
};

export const ratingProfile = async (profileRating: RatingProps) => {
  await updateDoc(doc(db, "profiles", profileRating.fromProfileId), {
    rating: arrayUnion(profileRating),
  });
};

export const editRatingProfile = async (
  profileRating: RatingProps,
  completeRating: RatingProps[]
) => {
  await updateDoc(doc(db, "profiles", profileRating.fromProfileId), {
    rating: [...completeRating, profileRating],
  });
};

/* -----> Event Updates */
// Profile Updates for string or number types
export const updateEventCategoryDB = async (
  eventId: string,
  categoryName: string,
  newInfo: string | number
) => {
  await updateDoc(doc(db, "events", eventId), {
    [categoryName]: newInfo,
  });
};

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
