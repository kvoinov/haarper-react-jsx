// scripts/fetch-events.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANT: point this to the real API endpoint
const API_URL = "https://haarper.pt/api/events/get.php";

// Convert MySQL "YYYY-MM-DD HH:mm:ss" to ISO-ish string
function toIsoMaybe(mysql) {
  if (!mysql) return null;
  if (mysql.includes(" ")) return mysql.replace(" ", "T"); // no timezone info
  return mysql;
}

function normalizeImage(img) {
  if (!img) return null;
  // allow absolute
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  // ensure leading slash
  return img.startsWith("/") ? img : `/${img}`;
}

async function main() {
  const res = await fetch(API_URL, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`fetch-events failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error(`fetch-events expected array, got: ${typeof data}`);
  }

  // Build an object keyed by slug for easy lookup in prerender
  const bySlug = {};
  for (const e of data) {
    const slug = e.e_slug ?? e.slug ?? e.event_slug;
    if (!slug) continue;

    bySlug[slug] = {
      title: e.event_name ?? "",
      description: e.event_short_desc ?? "",
      image: normalizeImage(`assets/event_img/${e.event_image}`),
      ogImage: normalizeImage(`assets/event_img/og-images/${e.event_og_image}`), // optional if you add it later
      // You can use event_date as "published_time" if you want (it's event time though)
      dateIso: toIsoMaybe(e.event_date),
    };
  }

  const outPath = path.join(__dirname, "..", "src", "data", "events.json");
  fs.writeFileSync(outPath, JSON.stringify(bySlug, null, 2), "utf8");

  console.log(
    `✅ events.json generated with ${
      Object.keys(bySlug).length
    } events -> src/data/events.json`
  );
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
