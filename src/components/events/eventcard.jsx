import { Link } from "react-router-dom";

function EventCard(props) {
  return (
    <div className="service-card event-card">
      <div className="events-image">
        <img src={"/event_img/" + props.image} alt={props.title} />
      </div>
      <h3>{props.title}</h3>
      <p>{props.para}</p>

      <h5>
        <span>Price: </span>
        {props.price}
      </h5>
      <h5>
        <span>Date: </span>
        {props.date}
      </h5>
      <h5>
        <span>Duration: </span>
        {props.duration}
      </h5>

      <Link to={"/events/" + props.slug}>
        <button className="btn">{props.btn}</button>
      </Link>
    </div>
  );
}

export default EventCard;
