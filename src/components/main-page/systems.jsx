import { useEffect, useMemo, useState } from "react";

function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const onChange = () => setIsMobile(mq.matches);

    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpointPx]);

  return isMobile;
}

function Systems() {
  const systems = [
    { name: "rust", src: "/assets/systems/rust.avif" },
    { name: "claude", src: "/assets/systems/claude.avif" },
    { name: "Sharetribe", src: "/assets/systems/sharetribe.avif" },
    { name: "HubSpot", src: "/assets/systems/hubspot.avif" },
    { name: "chatgpt", src: "/assets/systems/chatgpt.avif" },
    { name: "Squarespace", src: "/assets/systems/squarespace.avif" },
    { name: "googlecloud", src: "/assets/systems/googlecloud.avif" },
    { name: "aws", src: "/assets/systems/aws.avif" },
    { name: "make", src: "/assets/systems/make.avif" },
    { name: "Salesforce", src: "/assets/systems/salesforce.avif" },
    { name: "Shopify", src: "/assets/systems/shopify.avif" },
    { name: "Symfony", src: "/assets/systems/symfony.avif" },
    { name: "mysql", src: "/assets/systems/mysql.avif" },
    { name: "n8n", src: "/assets/systems/n8n.avif" },
    { name: "c++", src: "/assets/systems/c++.avif" },
    { name: "wordpress", src: "/assets/systems/wordpress.avif" },
    { name: "microsoft", src: "/assets/systems/microsoft.avif" },
    { name: "node", src: "/assets/systems/node.avif" },
    { name: "postgre", src: "/assets/systems/postgre.avif" },
    { name: "django", src: "/assets/systems/django.avif" },
    { name: "cue", src: "/assets/systems/cue.avif" },
    { name: "zapier", src: "/assets/systems/zapier.avif" },
    { name: "laravel", src: "/assets/systems/laravel.avif" },
    { name: "whatsapp", src: "/assets/systems/whatsapp.avif" },
  ];

  const isMobile = useIsMobile(768);
  const [expanded, setExpanded] = useState(false);

  // If user rotates / resizes to desktop, show all automatically.
  useEffect(() => {
    if (!isMobile) setExpanded(true);
    if (isMobile) setExpanded(false);
  }, [isMobile]);

  const visibleSystems = useMemo(() => {
    if (!isMobile) return systems;
    return expanded ? systems : systems.slice(0, 2);
  }, [isMobile, expanded, systems]);

  const canToggle = isMobile && systems.length > 2;

  return (
    <section className="systems" aria-label="Platforms we specialize in">
      <div className="full-container">
        <h2 className="systems__title">We are specialists in</h2>

        <div className="systems__grid">
          {visibleSystems.map((s) => (
            <div className="systems__item" key={s.name} title={s.name}>
              <img
                src={s.src}
                alt={s.name}
                className="systems__logo"
                loading="lazy"
              />
            </div>
          ))}

          {canToggle && (
            <button
              type="button"
              className="systems__toggle"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : `Show more`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Systems;
