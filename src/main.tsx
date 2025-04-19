import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./login/Login.tsx";
import { Event } from "./eventPage/Event.tsx";
import { Profile } from "./profile/Profile.tsx";
import { App } from "./App.tsx";
import { EventsMainPage } from "./EventsMainPage.tsx";
import { AboutUs } from "./aboutUs/AboutUs.tsx";
import { ContactUs } from "./contactUs/ContactUs.tsx";
import { Cookies } from "./cookies/Cookies.tsx";
import { PrivacyPolicy } from "./privacyPolicy/PrivacyPolicy.tsx";
import { ServiceTerms } from "./serviceTerms/ServiceTerms.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<EventsMainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event/:userEventId" element={<Event />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/service" element={<ServiceTerms />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
