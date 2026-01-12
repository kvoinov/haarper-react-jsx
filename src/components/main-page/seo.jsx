import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://haarper.pt";

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function upsertLink(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function upsertJsonLd(id, data) {
  const selector = `script[type="application/ld+json"][data-seo="${id}"]`;
  let el = document.head.querySelector(selector);
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

const Seo = ({
  title,
  description,
  image = "https://haarper.pt/favicon.ico",
  structuredData,
  type = "website",
  url, // optional override
}) => {
  const { pathname } = useLocation();
  const canonicalUrl = url ?? `${SITE_URL}${pathname}`;

  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: description,
      });
    }

    // Canonical
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    // Open Graph
    if (title)
      upsertMeta('meta[property="og:title"]', {
        property: "og:title",
        content: title,
      });
    if (description)
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: image,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    if (title)
      upsertMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
        content: title,
      });
    if (description)
      upsertMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
        content: description,
      });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: image,
    });

    // JSON-LD
    upsertJsonLd("structured-data", structuredData);
    document.dispatchEvent(new Event("prerender-ready"));
  }, [title, description, image, structuredData, type, canonicalUrl]);

  return null;
};

export default Seo;
