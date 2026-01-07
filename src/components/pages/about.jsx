import team from "../../data/team";
import Seo from "../main-page/seo";
import { useEffect } from "react";
function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const firstParagraph =
    team?.[0]?.content?.find((b) => b.type === "p")?.value || "";

  const metaDescription = firstParagraph.slice(0, 160);
  const canonicalUrl = `https://haarper.pt/about`;

  // Optional: pick an OG image from first person (or set a fixed one)
  const ogImage = `https://haarper.pt${team?.[0]?.image || ""}`;

  return (
    <>
      <Seo
        title="Meet our team | Haarper"
        description={metaDescription}
        url={canonicalUrl}
        image={ogImage}
        type="about"
      />

      <section className="team-page" id="team-page">
        <div className="container">
          <div class="about-div-main">
            <h2>About Haarper</h2>
            <div class="about-div-left">
              <p class="about-div-p">
                Haarper was founded in 2018 with a mission to provide
                comprehensive IT solutions that empower businesses to achieve
                their goals through technology. Our team of experts brings
                decades of combined experience across various IT disciplines.
              </p>
              <p class="about-div-p">
                We believe that technology should be an enabler, not a barrier.
                That's why we focus on delivering solutions that are not only
                technically sound but also aligned with your business objectives
                and user needs.
              </p>
              <p>
                Our collaborative approach ensures that we understand your
                unique challenges and opportunities, allowing us to create
                tailored solutions that drive real results for your
                organization.
              </p>
            </div>
            <div class="about-div-right">
              <img alt="Office" src="/assets/office.jpg" />
            </div>
          </div>

          <div className="team-row">
            <div className="team-row__content">
              {team.map((member, memberIndex) => (
                <div key={memberIndex} className="team-member">
                  {member.image && (
                    <div className="team-row__content-image">
                      <img src={member.image} alt={member.name} />
                    </div>
                  )}

                  <h3>{member.name}</h3>

                  {member.content?.map((block, i) => {
                    if (block.type === "p") return <p key={i}>{block.value}</p>;
                    if (block.type === "h2")
                      return <h2 key={i}>{block.value}</h2>;
                    if (block.type === "h3")
                      return <h3 key={i}>{block.value}</h3>;
                    if (block.type === "ul") {
                      return (
                        <ul key={i}>
                          {block.items?.map((it, idx) => (
                            <li key={idx}>{it.text}</li>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  })}
                  <div
                    style={{
                      marginTop: "auto",
                      marginLeft: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    <a
                      target="_blank"
                      href={member.linkedin}
                      className="social-link social-link-about"
                    >
                      <img src="/assets/linked.svg" alt="LinkedIn" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
