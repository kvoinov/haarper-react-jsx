import FeaturesCard from "./features_card";

const items = [
  {
    title: "Expertise & Experience",
    img: "/assets/icons/expert.svg",
    par: "Our team brings years of industry experience and specialized expertise to every project.",
  },
  {
    title: "Tailored Solutions",
    img: "/assets/icons/tailored.svg",
    par: "We don't believe in one-size-fits-all approaches – every solution is customized to your unique needs.",
  },
  {
    title: "Clear Communication",
    img: "/assets/icons/comms.svg",
    par: "We prioritize transparent, jargon-free communication to ensure you understand every aspect of your IT solutions.",
  },
  {
    title: "Responsive Support",
    img: "/assets/icons/resp_support.svg",
    par: "Our dedicated team provides quick, effective support whenever you need assistance with your technology.",
  },
];

function Features() {
  return (
    <section className="why-us" id="why-us">
      <div className="container">
        <h2 className="section-title">Why Choose Haarper</h2>
        <div className="features">
          {items.map((item) => (
            <FeaturesCard
              key={item.title}
              image={item.img}
              title={item.title}
              para={item.par}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
