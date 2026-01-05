import TestimonialsCard from "./testimonials_card";

const items = [
  {
    name: "Sarah Johnson",
    b_title: "Project Manager, Nestlé",
    par: "Haarper revolutionized our workflows by integrating AI-driven automation into our operations. Their deep expertise and tailored solutions streamlined our processes, reduced manual effort, and significantly improved efficiency across the board.",
    avatar: "assets/testimonial/sarah.jpg",
  },
  {
    name: "João Oliveira",
    b_title: "Product Manager, REMAX",
    par: "The AI integration Remax implemented has transformed our lead management process, reducing information retrieval from hours to mere seconds. Our agents can now access comprehensive lead data instantly, dramatically improving response times and conversion rates.",
    avatar: "assets/testimonial/joao.jpg",
  },
  {
    name: "Emily Persson",
    b_title: "Operations Director, IKEA",
    par: "Working with Haarper on our AI-powered knowledge management system has completely changed how we operate. The intelligent automation they implemented enables seamless information flow throughout our organization, while AI-driven search and categorization have dramatically accelerated our workflows and reduced manual processes.",
    avatar: "assets/testimonial/emily.jpg",
  },
];

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials-container">
          {items.map((item) => (
            <TestimonialsCard
              key={item.name}
              para={item.par}
              name={item.name}
              b_title={item.b_title}
              avatar={item.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
