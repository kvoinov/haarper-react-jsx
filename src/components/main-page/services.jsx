import ServiceCard from "./service_card";

const items = [
  {
    title: "AI & Workflow Automation",
    img: "/assets/ai.svg",
    par: "Intelligent automation solutions leveraging AI to streamline your business processes",
    class: "service--bg service--bg--ai",
    slug: "ai-automation",
  },
  {
    title: "Software Development",
    img: "/assets/software_dev.svg",
    par: "Custom software solutions tailored to your specific business needs and requirements.",
    class: "service--bg service--bg--dev",
    slug: "software-development",
  },
  {
    title: "IT Consulting",
    img: "/assets/it_consulting.svg",
    par: "Strategic technology planning and guidance to optimize your IT infrastructure.",
    class: "service--bg service--bg--tech",
    slug: "it-consulting",
  },
  {
    title: "Web Development",
    img: "/assets/web_dev.svg",
    par: "Responsive, user-friendly websites and web applications.",
    class: "service--bg service--bg--network",
    slug: "web-development",
  },
  {
    title: "IT Support",
    img: "/assets/it_support.svg",
    par: "Reliable technical assistance for all your technology needs.",
    class: "service--bg service--bg--support",
    slug: "it-support",
  },
  {
    title: "Knowledge Management",
    img: "/assets/km.svg",
    par: "Effective systems and practices to capture, organize, and leverage your knowledge.",
    class: "service--bg service--bg--know",
    slug: "knowledge-management",
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {items.map((item) => (
            <ServiceCard
              key={item.title}
              image={item.img}
              title={item.title}
              para={item.par}
              class={item.class}
              slug={item.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
