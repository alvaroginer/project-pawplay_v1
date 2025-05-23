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

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const hasCompletedProfile = (profile: ProfileData | null): boolean => {
  if (
    !profile ||
    !profile.profileName ||
    !profile.breed ||
    !profile.gender ||
    !profile.size
  )
    return false;
  return Boolean(
    profile.profileName.length > 0 &&
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
