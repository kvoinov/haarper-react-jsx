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
import ServicePage from "./components/pages/services";
import CaseStudy from "./components/pages/case-study";
import ReactGA from "react-ga4";
import NotFound from "./components/pages/not-found";
import About from "./components/pages/about";
import RequireConsent from "./components/main-page/RequireConsent";

function TrackPageView() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

export function AppLayout() {
  const location = useLocation();

  return (
    <>
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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    ReactGA.initialize("G-SB5XZXW4H0");
  }, []);

  return (
    <BrowserRouter>
      <TrackPageView />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
