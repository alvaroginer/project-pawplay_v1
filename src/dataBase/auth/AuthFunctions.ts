import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { authKey } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ProfileData, UserData } from "../../types";
import { getOneProfile, getOneUser } from "../services/readFunctions";
import { toast } from "react-toastify";

export const loginAuthContext = async (userUid: string) => {
  const userSnap = await getDoc(doc(db, "users", userUid));
  if (!userSnap.exists()) {
    console.warn("User not found");
    return null;
  }

  const userDataSnap = userSnap.data() as UserData;

  const firstProfileSnap = await getOneProfile(userDataSnap.uid);
  if (!firstProfileSnap) {
    console.warn("Profile not found");
    return null;
  }

  const logInData = { userData: userDataSnap, profileData: firstProfileSnap };

  return logInData;
};

export const authGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signOut(authKey);
    const result = await signInWithPopup(authKey, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    if (!user.email || !user.displayName) {
      console.warn(
        "Problemas con la creación de ususario, datos no suficientes"
      );
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      const profileRef = collection(db, "profiles");
      const newProfileRef = doc(profileRef);

      const newUserData: UserData = {
        uid: user.uid,
        mail: user.email,
        name: user.displayName,
        profiles: [newProfileRef.id],
      };

      await setDoc(userDocRef, newUserData);

      const newProfileData: ProfileData = {
        userUid: user.uid,
        id: newProfileRef.id,
        likedEvents: [],
      };

      await setDoc(newProfileRef, newProfileData);
      toast(`Hi ${user.displayName}, welcome to PawPlay!`);

      return { userData: newUserData, profileData: newProfileData };
    }
    const firstUserSnap = await getOneUser(user.uid);
    if (!firstUserSnap) {
      console.warn("Profile not found");
      return null;
    }

    const firstProfileSnap = await getOneProfile(firstUserSnap.profiles[0]);
    if (!firstProfileSnap) {
      console.warn("Profile not found");
      return null;
    }

    console.log("Usuario autenticado:", user);
    console.log("Token de acceso:", token);

    toast(`Hi ${firstProfileSnap.profileName}, welcome back!`);
    return {
      userData: firstUserSnap,
      profileData: firstProfileSnap,
    };
  } catch (error: any) {
    console.error("Error al iniciar sesión", error.code, error.message);
  }
};
