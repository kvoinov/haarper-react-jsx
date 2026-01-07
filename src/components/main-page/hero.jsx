function Hero({ onScheduleClick }) {
  return (
    <section className="hero hero--bg">
      <div className="container hero__content">
        <h1>AI-Powered Software & App Development</h1>
        <p>
          Haarper specializes in AI-driven software and application development,
          delivering intelligent solutions tailored to your business needs. From
          concept to deployment, we build scalable apps, automate workflows, and
          create innovative digital products that give you a competitive edge.
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
