import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { EventData, oneRatingProps, ProfileData } from "../../types";

/* -----> Events */
// Create events in database
export const createEventDb = async (eventData: EventData) => {
  const eventRef = collection(db, "events");
  const newEventRef = doc(eventRef);
  const eventDataWithRef = { ...eventData, id: newEventRef.id };

  await setDoc(newEventRef, eventDataWithRef);
  console.log(
    "Event created in FireBase with the following data",
    eventDataWithRef
  );
  return eventDataWithRef.id;
};

/* -----> Profiles */
// Create profiles in database
export const createProfileDb = async (profileData: ProfileData) => {
  const profileRef = collection(db, "profiles");
  const newProfileRef = doc(profileRef);
  const profileDataWithRef = { ...profileData, id: newProfileRef.id };

  await setDoc(newProfileRef, profileDataWithRef);
  console.log(
    "Event created in FireBase with the following data",
    profileDataWithRef
  );
  return profileDataWithRef.id;
};

/* -----> Rating */
// Create a rating in database
export const createCompleteProfileRating = async (
  eventCreatorId: string,
  profileRating: oneRatingProps
) => {
  const ratingRef = collection(db, "ratings", eventCreatorId);
  const newRatingRef = doc(ratingRef);
  const ratingDataWithRef = { rating: [profileRating] };

  await setDoc(newRatingRef, ratingDataWithRef);
  console.log("Rating object created", ratingDataWithRef);
};
