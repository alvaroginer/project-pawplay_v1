import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages/login/Login.tsx";
import { Event } from "./pages/eventPage/Event.tsx";
import { Profile } from "./pages/profile/Profile.tsx";
import { App } from "./App.tsx";
import { EventsMainPage } from "./pages/EventsMainPage.tsx";
import { AboutUs } from "./pages/aboutUs/AboutUs.tsx";
import { ContactUs } from "./pages/contactUs/ContactUs.tsx";
import { CreateEvent } from "./pages/createEvent/CreateEvent.tsx";
import { CreateProfile } from "./pages/createProfile/CreateProfile.tsx";
import { ProfileSelection } from "./pages/profileSelection/ProfileSelection.tsx";
import { SignUp } from "./pages/signUp/SignUp.tsx";
import { AuthProvider } from "./hooks/auth/AuthContext.tsx";
import { MyPastEvents } from "./pages/myEvents/myPastEvents/MyPastEvents.tsx";
import { MyUpcomingEvents } from "./pages/myEvents/myUpcomingEvents/MyUpcomingEvents.tsx";
import { MyHostedEvents } from "./pages/myEvents/myHostedEvents/MyHostedEvents.tsx";
import { MyFavouriteEvents } from "./pages/myEvents/myFavouriteEvents/MyFavouriteEvents.tsx";
import { PrivacyPolicy } from "./pages/legalPages/PrivacyPolicy.tsx";
import { Cookies } from "./pages/legalPages/Cookies.tsx";
import { TermsOfService } from "./pages/legalPages/TermsOfService.tsx";
import { Landing } from "./pages/landing/Landing.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<EventsMainPage />} />
          <Route path='/event/:eventId' element={<Event />} />
          <Route path='/profile/:profileId' element={<Profile />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/create-event' element={<CreateEvent />} />
          <Route path='/profile-selection' element={<ProfileSelection />} />
          <Route path='/create-profile' element={<CreateProfile />} />
          <Route path='/my-events/hosted' element={<MyHostedEvents />} />
          <Route path='/my-events/favourites' element={<MyFavouriteEvents />} />
          <Route path='/my-events/upcoming' element={<MyUpcomingEvents />} />
          <Route path='/my-events/past' element={<MyPastEvents />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/cookies' element={<Cookies />} />
          <Route path='/terms-of-service' element={<TermsOfService />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/landing' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
