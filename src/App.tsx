import { Header } from "./components/header/Header";
import { Outlet } from "react-router";
import "./App.css";
import "./index.css";

export interface FilterProps {
  activities: Record<string, boolean>;
  breeds: Record<string, boolean>;
  size: Record<string, boolean>;
  date: Record<number, boolean>;
}

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
