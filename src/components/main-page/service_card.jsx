import { Link } from "react-router-dom";

function ServiceCard(props) {
  return (
    <Link to={`/services/${props.slug}`} className="service-card-link">
      <div className={`service-card ${props.class || ""}`}>
        <div className="service-card-text">
          <h3>{props.title}</h3>
          <p>{props.para}</p>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
