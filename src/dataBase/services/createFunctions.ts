import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { EventData, ProfileData } from "../../types";

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
};
