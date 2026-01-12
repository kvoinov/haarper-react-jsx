import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import fs from "fs";
import path from "path";

const SITE_URL = "https://haarper.pt";

function routesFromSitemap() {
  const sitemapPath = path.resolve(process.cwd(), "public", "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) return ["/"];

  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());

  const routes = locs
    .map((loc) => {
      const u = new URL(loc);
      const p = u.pathname === "/" ? "/" : u.pathname.replace(/\/$/, "");
      return p || "/";
    })
    .filter(Boolean);

  return Array.from(new Set(routes));
}

export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root", // Vite React template uses <div id="root">
      additionalPrerenderRoutes: routesFromSitemap(),
    }),
  ],
});
