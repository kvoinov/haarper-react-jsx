function About() {
  return (
    <section className="about" id="about">
      <div className="container" style={{ padding: "5rem 0" }}>
        <h2 className="section-title">About Haarper</h2>
        <div className="about-div-main">
          <div className="about-div-left">
            <p className="about-div-p">
              Haarper was founded in 2018 with a mission to provide
              comprehensive IT solutions that empower businesses to achieve
              their goals through technology. Our team of experts brings decades
              of combined experience across various IT disciplines.
            </p>
            <p className="about-div-p">
              We believe that technology should be an enabler, not a barrier.
              That's why we focus on delivering solutions that are not only
              technically sound but also aligned with your business objectives
              and user needs.
            </p>
            <p>
              Our collaborative approach ensures that we understand your unique
              challenges and opportunities, allowing us to create tailored
              solutions that drive real results for your organization.
            </p>
          </div>
          <div className="about-div-right">
            <img src="/assets/office.jpg" alt="Office" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
