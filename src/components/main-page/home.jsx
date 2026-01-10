import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Features from "./features";
import Hero from "./hero";
import Testimonials from "./testimonials";
import Contact from "./contact";

import Services from "./services";
import Seo from "./seo";
import { orgSchema } from "../../../seoSchema";
import Systems from "./systems";
import Clients from "./clients";

function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get("scrollToContact") === "true") {
      setShowContactForm(true);
      setParams({});
    }
  }, [params, setParams]);

  useEffect(() => {
    if (showContactForm) {
      const timeout = setTimeout(() => {
        const contactElement = document.getElementById("contact");
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);

      return () => clearTimeout(timeout);
    }
  }, [showContactForm]);

  return (
    <>
      <Seo
        title="Haarper | AI-Powered Software & App Development"
        description="Eliminate operational inefficiencies with AI automation, custom software development, and strategic IT consulting. Scalable solutions for growing businesses."
        url="https://haarper.pt/"
        image="https://haarper.pt/favicon.ico"
        structuredData={orgSchema}
      />
      <Hero onScheduleClick={() => setShowContactForm(true)} />
      <Services />
      <Systems />
      <Features />
      <Clients />
      <Contact
        showContactForm={showContactForm}
        setShowContactForm={setShowContactForm}
      />

      <Testimonials />
    </>
  );
}

export default Home;
