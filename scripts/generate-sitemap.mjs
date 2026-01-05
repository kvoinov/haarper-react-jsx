import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE = "https://haarper.pt";

function readJson(relPath) {
  const p = path.join(__dirname, "..", relPath);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function escapeXml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const staticPaths = [
  "/",
  "/events",
  "/privacy-policy",
  "/gdpr",
  "/contact",
  "/about",
  "/case-studies",
  "/services",
];

const services = readJson("src/data/services.json"); // adjust if yours is .js
const caseStudies = readJson("src/data/case-study.json"); // adjust if needed

const servicePaths = services
  ? Object.keys(services).map((slug) => `/services/${slug}`)
  : [];
const caseStudyPaths = caseStudies
  ? Object.keys(caseStudies).map((slug) => `/case-studies/${slug}`)
  : [];

const allPaths = [...staticPaths, ...servicePaths, ...caseStudyPaths];

const now = new Date().toISOString().slice(0, 10);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  allPaths
    .map((p) => {
      const loc = `${SITE}${p}`;
      return (
        `  <url>\n` +
        `    <loc>${escapeXml(loc)}</loc>\n` +
        `    <lastmod>${now}</lastmod>\n` +
        `  </url>`
      );
    })
    .join("\n") +
  `\n</urlset>\n`;

const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(outPath, xml, "utf8");

console.log(
  `✅ sitemap.xml generated with ${allPaths.length} URLs -> public/sitemap.xml`
);
