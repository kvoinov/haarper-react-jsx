function Clients() {
  const clients = [
    {
      name: "Nestlé",
      src: "/assets/clients/nestle.png",
      link: "https://www.nestle.com/",
    },
    { name: "Sapo", src: "/assets/clients/sapo.png", link: "https://sapo.pt/" },
    {
      name: "Ikea",
      src: "/assets/clients/ikea.png",
      link: "https://www.ikea.com/pt/pt/",
    },
    {
      name: "Parnexus",
      src: "/assets/clients/parnexus.png",
      link: "https://www.parnexus.com/",
    },
    {
      name: "Gamescribes",
      src: "/assets/clients/gamescribes.png",
      link: "https://www.gamescribes.com/",
    },
    {
      name: "Unilever",
      src: "/assets/clients/unilever.png",
      link: "https://www.unilever.com/",
    },
    {
      name: "Remax",
      src: "/assets/clients/remax.png",
      link: "https://remax.pt/",
    },
    {
      name: "Sea Sage",
      src: "/assets/clients/seasage.png",
      link: "https://www.sea-sage.com/",
    },
    {
      name: "Fujitsu",
      src: "/assets/clients/fujitsu.png",
      link: "https://global.fujitsu/en-global",
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
