import { useParams } from "react-router-dom";
import cases from "../../data/case-study";
import Seo from "../main-page/seo";
import { useEffect } from "react";

function CaseStudy() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [slug]);

  const study = cases?.[slug];

  if (!study) {
    return (
      <div className="container" style={{ padding: "8rem 0" }}>
        <h2>Case study not found</h2>
        <p>The case study you requested does not exist.</p>
      </div>
    );
  }

  const firstParagraph =
    study.content?.find((b) => b.type === "p")?.value || "";

  const metaDescription = firstParagraph.slice(0, 160);

  const canonicalUrl = `https://haarper.pt/case-studies/${slug}/`;
  const ogImage = `https://haarper.pt${study.ogImage}`;

  return (
    <>
      <Seo
        title={`${study.title} | Haarper`}
        description={study.description}
        url={canonicalUrl}
        image={ogImage}
        type="article"
      />

      <section className="case-page" id="services-page">
        <div className="container">
          <div className="case-row">
            <div className="case-row__image">
              {study.imageClient && (
                <img src={study.imageClient} alt={study.title} />
              )}
            </div>

            <div className="case-row__content">
              {study.imageStudy && (
                <div className="case-row__content-image">
                  <img src={study.imageStudy} alt={study.title} />
                </div>
              )}

              <h2>{study.title}</h2>

              {study.content?.map((block, i) => {
                if (block.type === "p") return <p key={i}>{block.value}</p>;
                if (block.type === "h2") return <h2 key={i}>{block.value}</h2>;
                if (block.type === "h3") return <h3 key={i}>{block.value}</h3>;
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CaseStudy;
