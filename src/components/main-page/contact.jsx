import ContactUs from "../forms/contactus";

function Contact({ showContactForm, setShowContactForm }) {
  return (
    <>
      {!showContactForm && (
        <section className="cta" id="contact">
          <div className="container">
            <h2>
              Ready to Streamline Operations, Boost Productivity, and Scale with
              Confidence?
            </h2>
            <p>
              Contact us today to schedule a consultation and discover how
              Haarper's AI-powered automation, custom software and web
              development, IT consultation, and dedicated support services help
              businesses like yours work smarter and grow faster.
            </p>
            <a
              href="#"
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                setShowContactForm((prev) => !prev);
              }}
            >
              Contact Us Now
            </a>
          </div>
        </section>
      )}
      {showContactForm && <ContactUs />}
    </>
  );
}

export default Contact;
