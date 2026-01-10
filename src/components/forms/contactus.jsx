import { useState, useRef, useEffect } from "react";
import contactAPI from "../../api/contactAPI";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const thankYouRef = useRef(null);

  useEffect(() => {
    if (formSubmitted && thankYouRef.current) {
      thankYouRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [formSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await contactAPI.sendForm(formData);
      if (response.status === 200 && response.data?.status === "success") {
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-container">
          {!formSubmitted ? (
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Required</label>
                  <select
                    id="service"
                    name="service"
                    className="form-control"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="ai-workflow">
                      AI and Workflow automation
                    </option>
                    <option value="it-consulting">IT Consulting</option>
                    <option value="web-development">Web Development</option>
                    <option value="soft-development">
                      Software Development
                    </option>
                    <option value="km-technical">
                      Knowldge Management and Technical writing
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Message"}
                </button>
              </form>
            </div>
          ) : (
            <div className="thank-you-message" ref={thankYouRef}>
              <h3>Thank you for your inquiry!</h3>
              <p>We will get back to you in no time.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
