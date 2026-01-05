function Clients() {
  const clients = [
    { name: "Nestlé", src: "/assets/clients/nestle.png" },
    { name: "Sapo", src: "/assets/clients/sapo.png" },
    { name: "Ikea", src: "/assets/clients/ikea.png" },
    { name: "Parnexus", src: "/assets/clients/parnexus.png" },
    { name: "Gamescribes", src: "/assets/clients/gamescribes.png" },
    { name: "Unilever", src: "/assets/clients/unilever.png" },
    { name: "Remax", src: "/assets/clients/remax.png" },
    { name: "Sea Sage", src: "/assets/clients/seasage.png" },
    { name: "Fujitsu", src: "/assets/clients/fujitsu.png" },
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
