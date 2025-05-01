import { useState, createContext, ReactNode, useEffect } from "react";
import { ProfileData, UserData } from "../types";

interface AuthContextType {
  user: UserData | null;
  loggedProfile: ProfileData | null;
  login: (userData: UserData, profileData: ProfileData) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loggedProfile, setLoggedProfile] = useState<ProfileData | null>(null);

  //Load user from LocalStorage

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: UserData, profileData: ProfileData) => {
    setUser(userData);
    setLoggedProfile(profileData);
    const logInfoUser = { user: userData, profile: profileData };

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
