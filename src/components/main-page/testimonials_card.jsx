function TestimonialsCard(props) {
  return (
    <div className="testimonial">
      <div className="quote">"</div>
      <p>{props.para}</p>

      <div className="testimonial-author">
        <div className="author-avatar">
          <img src={props.avatar} alt={props.name} loading="lazy" />
        </div>

        <div className="author-info">
          <h4>{props.name}</h4>
          <p>{props.b_title}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsCard;
