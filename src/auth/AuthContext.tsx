import { useState, createContext, ReactNode, useEffect } from "react";
import { ProfileData, UserData } from "../types";

interface AuthContextType {
  user: UserData | null;
  loggedProfile: ProfileData | null;
  login: (userData: UserData, profileData: ProfileData) => void;
  logout: () => void;
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

  //Load user from LocalStorage

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    const storedUser: AuthLocalStorageProps | null = storedUserString
      ? (JSON.parse(storedUserString) as AuthLocalStorageProps)
      : null;

    if (storedUser) {
      setUser(storedUser.user);
      setLoggedProfile(storedUser.loggedProfile);
    }
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

  return (
    <AuthContext.Provider value={{ user, loggedProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
