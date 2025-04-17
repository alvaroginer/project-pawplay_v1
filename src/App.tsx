import { Header } from "./components/header/Header";
import { Outlet } from "react-router";
import "./App.css";
import "./index.css";

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
