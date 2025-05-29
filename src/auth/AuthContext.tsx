import { useState, createContext, ReactNode, useEffect } from "react";
import {
  dogBreedsType,
  dogGenderType,
  dogSizesType,
  ProfileData,
  UserData,
} from "../types";
import { getOneProfile, getOneUser } from "../dataBase/services/readFunctions";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  user: UserData | null;
  loggedProfile: ProfileData | null;
  isProfileCompleted: boolean;
  login: (userData: UserData, profileData: ProfileData) => void;
  logout: () => void;
  updateAuthContext: () => void;
  hasCompletedProfile: (profile: ProfileData) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthLocalStorageProps {
  user: UserData | null;
  loggedProfile: ProfileData | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loggedProfile: null,
  isProfileCompleted: false,
  login: () => {},
  logout: () => {},
  updateAuthContext: () => {},
  hasCompletedProfile: () => false,
});

const hasCompletedProfile = (profile: ProfileData | null): boolean => {
  if (
    !profile ||
    !profile.profileName ||
    !profile.breed ||
    !profile.gender ||
    !profile.size ||
    !profile.profilePhoto ||
    !profile.profileBio ||
    profile.age === undefined
  ) {
    return false;
  }

  return (
    dogBreedsType.includes(profile.breed) &&
    dogGenderType.includes(profile.gender) &&
    dogSizesType.includes(profile.size)
  );
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loggedProfile, setLoggedProfile] = useState<ProfileData | null>(null);
  const isProfileCompleted = hasCompletedProfile(loggedProfile);

  console.log(isProfileCompleted);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (firebaseUser) => {
      console.log("Auth state changed. Firebase user:", firebaseUser);

      if (firebaseUser) {
        const storedUserString = localStorage.getItem("user");
        const storedUser: AuthLocalStorageProps | null = storedUserString
          ? (JSON.parse(storedUserString) as AuthLocalStorageProps)
          : null;

        if (storedUser) {
          setUser(storedUser.user);
          setLoggedProfile(storedUser.loggedProfile);
        }
      } else {
        console.log("No authenticated user.");
        setUser(null);
        setLoggedProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (userData: UserData, profileData: ProfileData) => {
    setUser(userData);
    setLoggedProfile(profileData);
    const logInfoUser = { user: userData, loggedProfile: profileData };

    //Guardamos en localStorage
    localStorage.setItem("user", JSON.stringify(logInfoUser));
  };

  const logout = () => {
    setUser(null);
    setLoggedProfile(null);
  };

  const updateAuthContext = async () => {
    if (!user || !loggedProfile) return;

    const userSnap = await getOneUser(user.uid);
    if (userSnap === null) return;

    const profileSnap = await getOneProfile(loggedProfile.id);
    if (profileSnap === null) return;

    login(userSnap, profileSnap);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isProfileCompleted,
        loggedProfile,
        login,
        logout,
        updateAuthContext,
        hasCompletedProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
