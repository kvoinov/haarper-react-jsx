import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/main-page/header";
import Home from "./components/main-page/home";
import Footer from "./components/main-page/footer";
import EventList from "./components/events/eventlist";
import EventDetail from "./components/events/eventdetail";
import GDPRConsent from "./components/main-page/gdpr";
import PrivacyPolicy from "./components/main-page/privacy-policy";
import ConsentRequired from "./components/main-page/consent-required";
import Systems from "./components/main-page/systems";
import ServicePage from "./components/pages/services";
import ReactGA from "react-ga4";

function TrackPageView() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

function AppLayout() {
  const location = useLocation();

  return (
    <>
      <GDPRConsent />

      <Header
        onScheduleClick={
          location.pathname === "/"
            ? () =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
            : undefined
        }
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/consent-required" element={<ConsentRequired />} />
        <Route path="/services/:slug" element={<ServicePage />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    ReactGA.initialize("G-SB5XZXW4H0"); // Replace with your Measurement ID
  }, []);

  return (
    <BrowserRouter>
      <TrackPageView />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
