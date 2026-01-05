import { useParams } from "react-router-dom";
import services from "../../data/services";
import Seo from "../main-page/seo";
import { useEffect } from "react";

function ServicePage() {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [slug]);

  const service = services[slug];
  const firstParagraph =
    service.content?.find((b) => b.type === "p")?.value || "";
  const metaDescription =
    service.seoDescription || firstParagraph.slice(0, 160);

  const canonicalUrl = `https://haarper.pt/services/${slug}`;
  const ogImage = service.ogImage
    ? service.ogImage
    : `https://haarper.pt${service.image}`; // if service.image is "/assets/..."

  return (
    <>
      <Seo
        title={`${service.title} | Haarper`}
        description={metaDescription}
        url={canonicalUrl}
        image={ogImage}
        type="article"
        // structuredData={orgSchema} // optional
      />

      <section className="services-page" id="services-page">
        <div className="container">
          <div className="service-row">
            <div className="service-row__image">
              <img src={service.image} alt={service.title} />
            </div>

            <div className="service-row__content">
              <h2>{service.title}</h2>

              {service.content?.map((block, i) => {
                if (block.type === "p") return <p key={i}>{block.value}</p>;

                if (block.type === "ul") {
                  return (
                    <ul key={i}>
                      {block.items?.map((it, idx) => (
                        <li key={idx}>
                          <strong>{it.label}</strong> — {it.text}
                        </li>
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

export default ServicePage;
