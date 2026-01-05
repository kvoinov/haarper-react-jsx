function Systems() {
  const systems = [
    { name: "rust", src: "/assets/systems/rust.png" },
    { name: "claude", src: "/assets/systems/claude.png" },
    { name: "Sharetribe", src: "/assets/systems/sharetribe.png" },
    { name: "HubSpot", src: "/assets/systems/hubspot.png" },
    { name: "chatgpt", src: "/assets/systems/chatgpt.png" },

    { name: "Squarespace", src: "/assets/systems/squarespace.png" },
    { name: "c", src: "/assets/systems/c.png" },

    { name: "Salesforce", src: "/assets/systems/salesforce.png" },
    { name: "Shopify", src: "/assets/systems/shopify.png" },

    { name: "mysql", src: "/assets/systems/mysql.png" },
    { name: "n8n", src: "/assets/systems/n8n.png" },
    { name: "c++", src: "/assets/systems/c++.png" },
    { name: "wordpress", src: "/assets/systems/wordpress.png" },
    { name: "php", src: "/assets/systems/php.png" },
    { name: "postgre", src: "/assets/systems/postgre.png" },
    { name: "python", src: "/assets/systems/python.png" },
    { name: "zapier", src: "/assets/systems/zapier.png" },
    { name: "whatsapp", src: "/assets/systems/whatsapp.png" },
  ];

  return (
    <section className="systems" aria-label="Platforms we specialize in">
      <div className="full-container">
        <h2 className="systems__title">We are specialists in</h2>

        <div className="systems__grid">
          {systems.map((s) => (
            <div className="systems__item" key={s.name} title={s.name}>
              <img
                src={s.src}
                alt={s.name}
                className="systems__logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Systems;
