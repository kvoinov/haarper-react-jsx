function Clients() {
  const clients = [
    {
      name: "Nestlé",
      src: "/assets/clients/nestle.avif",
      link: "https://www.nestle.com/",
    },
    {
      name: "Sapo",
      src: "/assets/clients/sapo.avif",
      link: "https://sapo.pt/",
    },
    {
      name: "Millennium bcp",
      src: "/assets/clients/millenium.avif",
      link: "https://www.millenniumbcp.pt/",
    },
    {
      name: "Ikea",
      src: "/assets/clients/ikea.avif",
      link: "https://www.ikea.com/pt/pt/",
    },

    {
      name: "Vodafone",
      src: "/assets/clients/vodafone.avif",
      link: "https://www.vodafone.pt/",
    },

    {
      name: "Sonae",
      src: "/assets/clients/sonae.avif",
      link: "https://www.sonae.pt/",
    },
    {
      name: "Gamescribes",
      src: "/assets/clients/gamescribes.avif",
      link: "https://www.gamescribes.com/",
    },
    {
      name: "Unilever",
      src: "/assets/clients/unilever.avif",
      link: "https://www.unilever.com/",
    },
    {
      name: "Remax",
      src: "/assets/clients/remax.avif",
      link: "https://remax.pt/",
    },
    {
      name: "Sea Sage",
      src: "/assets/clients/seasage.avif",
      link: "https://www.sea-sage.com/",
    },
    {
      name: "Fujitsu",
      src: "/assets/clients/fujitsu.avif",
      link: "https://global.fujitsu/en-global",
    },
    {
      name: "Federaçao Portuguesa de Futebol",
      src: "/assets/clients/fpf.avif",
      link: "https://www.fpf.pt/",
    },
  ];

  // duplicate for seamless loop
  const shouldScroll = clients.length > 6;
  const loop = shouldScroll ? [...clients, ...clients] : clients;

  return (
    <section id="clients" className="clients" aria-label="Our clients">
      <div className="full-container">
        <h2 className="systems__title">Trusted by</h2>

        <div
          className={`clients-marquee ${shouldScroll ? "is-scrolling" : ""}`}
        >
          <div
            className={`clients-track ${shouldScroll ? "is-scrolling" : ""}`}
          >
            {loop.map((c, idx) => (
              <a
                key={`${c.name}-${idx}`}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="clients-link"
                title={c.name}
              >
                <div
                  className="clients-item"
                  key={`${c.name}-${idx}`}
                  title={c.name}
                >
                  <img
                    src={c.src}
                    alt={c.name}
                    className="clients-logo"
                    loading="lazy"
                    draggable="false"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
