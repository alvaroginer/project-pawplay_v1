import { Header } from "./components/header/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";
import { Footer } from "./components/footer/Footer";

export const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
};
