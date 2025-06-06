import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../dataBase/firebase";
import { toast } from "react-toastify";

// -----> Delete an Event
export const deleteOneEvent = async (eventId: string) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    toast.success("Your event was succesfully deleted");
  } catch {
    console.error(`Event with ID:${eventId} was not deleted`);
  }
};

// -----> Delete a Profile
//Comprobar si el id del pefil que eliminamos es el mismo que el del perfil loggeado, entonces, debemos decir que no puede hacerlo
export const deleteOneProfile = async (profileId: string) => {
  try {
    await deleteDoc(doc(db, "profiles", profileId));
    toast.success("Your profile was succesfully deleted");
  } catch {
    console.error(`Profile with ID:${profileId} was not deleted`);
  }
};
