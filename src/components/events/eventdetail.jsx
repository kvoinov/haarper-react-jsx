import { useState, useRef, useEffect } from "react";
import eventAPI from "../../api/eventAPI";
import { useParams } from "react-router-dom";
import Seo from "../main-page/seo";
import { orgSchema } from "../../../seoSchema";

function EventDetail() {
  const [eventData, setEventData] = useState(null);
  const { slug } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event_id: 0,
    event_name: "",
    event_date: "",
    event_price: "",
  });

  const [message, setMessage] = useState(null);
  const [spamail, setSpamail] = useState(null);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    const loadEvent = async () => {
      if (!slug) return;

      try {
        const data = await eventAPI.fetchOne(slug);
        setEventData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      event_id: eventData?.id ?? 0,
      event_name: eventData?.title ?? "",
      event_date: eventData?.date ?? "",
      event_price: eventData?.price ?? "",
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
      const response = await eventAPI.registerEvent(formData);

      if (response.status === 200) {
        setFormSubmitted(true);

        if (response.data === true) {
          setMessage(
            "Thank you for registering to this event!\nYou will shortly receive an email with all the details about this event."
          );
          setSpamail(
            "Please make sure to check your spam folder if you do not receive an email"
          );
        } else {
          setMessage(
            "You are already registered for this event!\nWe look forward to your participation."
          );
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title={"" + (eventData?.title ?? "")}
        description={"" + (eventData?.short_desc ?? "")}
        url={"https://haarper.pt/events" + (eventData?.slug ?? "")}
        image={"/event_img/" + (eventData?.img ?? "")}
        structuredData={orgSchema}
      />

      <section className="contact-section">
        <div className="container">
          <div className="event-container">
            <div className="details-left-side">
              <div className="events-image">
                <img
                  src={"/assets/event_img/" + (eventData?.img ?? "")}
                  alt={eventData?.title || "Event"}
                />
              </div>

              <h3>{eventData?.title}</h3>

              <p>
                {(eventData?.description ?? "")
                  .split("\n")
                  .map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </p>

              <div className="event-card">
                <h5>
                  <span>Price: </span>
                  {eventData?.price}
                </h5>
                <h5>
                  <span>Date: </span>
                  {eventData?.date}
                </h5>
                <h5>
                  <span>Duration: </span>
                  {eventData?.duration}
                </h5>
              </div>
            </div>

            <div className="details-right-side">
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

                    <button type="submit" className="btn" disabled={loading}>
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </form>
                </div>
              ) : (
                <div
                  className="thank-you-message confirmation-message"
                  ref={thankYouRef}
                >
                  <h3 style={{ whiteSpace: "pre-line" }}>{message}</h3>
                  <p style={{ whiteSpace: "pre-line" }}>{spamail}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventDetail;
