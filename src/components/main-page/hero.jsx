function Hero({ onScheduleClick }) {
  return (
    <section className="hero hero--bg">
      <div className="container hero__content">
        <h1>Expert IT Solutions for Your Business</h1>
        <p>
          Haarper provides comprehensive IT consulting, support, knowledge
          management, technical writing, and development services to help your
          business succeed in the digital landscape.
        </p>
        <div className="hero-btns">
          <a
            href="#contact"
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              onScheduleClick();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Schedule a Consultation
          </a>
          <a href="#services" className="btn btn-secondary">
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
