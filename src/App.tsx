import { Header } from "./components/header/Header";
import { Outlet } from "react-router";
import "./App.css";
import "./index.css";
import { Footer } from "./components/footer/Footer";

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
