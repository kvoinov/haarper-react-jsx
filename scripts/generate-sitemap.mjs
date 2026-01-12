import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const events = readJson("src/data/events.json");
const eventPaths = events
  ? Object.keys(events).map((slug) => `/events/${slug}`)
  : [];

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

// Ensure sitemap URLs match your canonical format:
// - "/" stays "/"
// - everything else ends with "/"
function canonPath(p) {
  if (!p) return "/";

  // ensure leading slash
  let out = p.startsWith("/") ? p : `/${p}`;

  // collapse accidental double slashes
  out = out.replace(/\/{2,}/g, "/");

  // root stays root
  if (out === "/") return "/";

  // ensure trailing slash
  return out.endsWith("/") ? out : `${out}/`;
}

function canonLoc(p) {
  return `${SITE}${canonPath(p)}`;
}

/**
 * Only include real, indexable pages.
 * NOTE:
 * - "/contact" is not a real route in your SPA (you scroll to "#contact" on home).
 * - "/gdpr" also doesn't exist as a route based on your posted router.
 * If you later add actual pages for them, you can add them back.
 */
const staticPaths = [
  "/",
  "/events",
  "/privacy-policy",
  "/about",
  "/case-studies",
];

const services = readJson("src/data/services.json"); // adjust if yours is .js
const caseStudies = readJson("src/data/case-study.json"); // adjust if needed

const servicePaths = services
  ? Object.keys(services).map((slug) => `/services/${slug}`)
  : [];

const caseStudyPaths = caseStudies
  ? Object.keys(caseStudies).map((slug) => `/case-studies/${slug}`)
  : [];

// Deduplicate + canonicalize paths so you don't output both with/without slash
const allPaths = Array.from(
  new Set(
    [...staticPaths, ...servicePaths, ...caseStudyPaths, ...eventPaths].map(
      canonPath
    )
  )
);

// Optional: stable sort (nice for diffs)
allPaths.sort((a, b) => a.localeCompare(b));

const now = new Date().toISOString().slice(0, 10);

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  allPaths
    .map((p) => {
      const loc = canonLoc(p);
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
