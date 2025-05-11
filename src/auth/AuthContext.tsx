import { useState, createContext, ReactNode, useEffect } from "react";
import { ProfileData, UserData } from "../types";
import { getOneProfile, getOneUser } from "../dataBase/services/readFunctions";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  user: UserData | null;
  loggedProfile: ProfileData | null;
  login: (userData: UserData, profileData: ProfileData) => void;
  logout: () => void;
  updateAuthContext: () => void;
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loggedProfile, setLoggedProfile] = useState<ProfileData | null>(null);

  // //Load user from LocalStorage
  // useEffect(() => {
  //   const storedUserString = localStorage.getItem("user");
  //   const storedUser: AuthLocalStorageProps | null = storedUserString
  //     ? (JSON.parse(storedUserString) as AuthLocalStorageProps)
  //     : null;

  //   if (storedUser) {
  //     setUser(storedUser.user);
  //     setLoggedProfile(storedUser.loggedProfile);
  //   }
  // }, []);

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
      value={{ user, loggedProfile, login, logout, updateAuthContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};
