// seoSchema.js (project root)

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Haarper",
  url: "https://haarper.pt/",
  logo: "https://haarper.pt/favicon.ico",

  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@haarper.pt",
      availableLanguage: ["en", "pt"],
    },
  ],

  // Platforms / tools / technologies you specialize in
  knowsAbout: [
    "Rust",
    "Claude",
    "Sharetribe",
    "HubSpot",
    "ChatGPT",
    "Squarespace",
    "C",
    "Salesforce",
    "Shopify",
    "MySQL",
    "n8n",
    "C++",
    "WordPress",
    "PHP",
    "PostgreSQL",
    "Python",
    "Zapier",
    "WhatsApp",
  ],

  // Optional: add your real social URLs if you want (remove if you don't have them)
  sameAs: [
    "https://www.linkedin.com/company/haarper/",
    //   "https://twitter.com/yourhandle",
    //   "https://www.facebook.com/yourpage"
  ],
};
