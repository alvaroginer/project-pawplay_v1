import { Header } from "./components/header/Header";
import { Outlet, useLocation } from "react-router";
import { ToastContainer, Slide } from "react-toastify";
import { Footer } from "./components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <>
      <Header />
      <ToastContainer transition={Slide} />
      <div className='outlet-container'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
