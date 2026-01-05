function FeaturesCard(props) {
  return (
    <div className="feature">
      <div className="feature-icon">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="feature-content">
        <h3>{props.title}</h3>
        <p>{props.para}</p>
      </div>
    </div>
  );
}

export default FeaturesCard;
