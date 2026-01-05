import ContactUs from "../forms/contactus";

function Contact({ showContactForm, setShowContactForm }) {
  return (
    <>
      {!showContactForm && (
        <section className="cta" id="contact">
          <div className="container">
            <h2>Ready to Transform Your IT Infrastructure?</h2>
            <p>
              Contact us today to schedule a consultation and discover how
              Haarper can help your business thrive with expert IT solutions.
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
