import { Header } from "./components/header/Header";
import { Outlet } from "react-router";
import { ToastContainer, Slide } from "react-toastify";
import { Footer } from "./components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";

export const App = () => {
  return (
    <>
      <Header />
      <ToastContainer transition={Slide} />
      <Outlet />
      <Footer />
    </>
  );
};
