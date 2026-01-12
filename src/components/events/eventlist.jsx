import EventCard from "./eventcard";
import { useEffect, useState } from "react";
import eventAPI from "../../api/eventAPI";
import Seo from "../main-page/seo";

const btn = "Register Now";
const title = "Upcoming Events | Haarper";
const description =
  "Explore our upcoming events hosted by IT experts and digital strategists. Join us to learn, network, and grow your business.";
function EventList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await eventAPI.fetchAll();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);
  const canonicalUrl = "https://haarper.pt/events/";
  return (
    <>
      <Seo
        title={title}
        description={description}
        url={canonicalUrl}
        type="website"
      />

      <section className="events" id="events">
        <div className="container">
          <h2 className="section-title">Upcoming events</h2>

          {loading ? (
            <p>Loading events...</p>
          ) : items.length === 0 ? (
            <p>
              No events are currently scheduled, but stay tuned! We regularly
              update this page with new events where our experts share valuable
              insights and answer your questions on key topics. In the meantime,
              feel free to contact us to learn how our services can help grow
              your business.
            </p>
          ) : (
            <div className="services-grid">
              {items.map((item) => (
                <EventCard
                  key={item.id}
                  image={item.img}
                  title={item.title}
                  para={item.par}
                  btn={btn}
                  slug={item.slug}
                  price={item.price}
                  duration={item.duration}
                  date={item.date}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default EventList;
