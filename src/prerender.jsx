import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import { AppLayout } from "./App";

import events from "./data/events.json";
import services from "./data/services";
import cases from "./data/case-study";
// import events from "./data/events"; // <-- add your events data file (example below)

const SITE_URL = "https://haarper.pt";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo_noback.png`; // must exist in /public
const DEFAULT_AUTHOR_NAME = "Haarper";
const DEFAULT_AUTHOR_URL = "https://www.haarper.pt";

function toAbsoluteUrl(maybeUrl) {
  if (!maybeUrl) return null;
  if (maybeUrl.startsWith("http://") || maybeUrl.startsWith("https://"))
    return maybeUrl;
  const path = maybeUrl.startsWith("/") ? maybeUrl : `/${maybeUrl}`;
  return `${SITE_URL}${path}`;
}

function cleanPath(urlPath) {
  if (!urlPath) return "/";
  return urlPath === "/" ? "/" : urlPath.replace(/\/$/, "");
}
function canonicalPath(urlPath) {
  if (!urlPath || urlPath === "/") return "/";
  return urlPath.endsWith("/") ? urlPath : `${urlPath}/`;
}
/*
function matchSlug(pathname, prefix) {
  // prefix example: "/services/"
  if (!pathname.startsWith(prefix)) return null;
  const rest = pathname.slice(prefix.length);
  if (!rest || rest.includes("/")) return null;
  return decodeURIComponent(rest);
}*/

function matchSlug(pathname, prefix) {
  if (!pathname.startsWith(prefix)) return null;

  // remove the prefix and any trailing slash
  const rest = pathname.slice(prefix.length).replace(/\/$/, "");

  if (!rest || rest.includes("/")) return null;
  return decodeURIComponent(rest);
}

/**
 * Returns an object:
 * {
 *   title, description, ogImage,
 *   type: "website" | "article",
 *   authorName, authorUrl,
 *   publishedTime, modifiedTime
 * }
 * or null if not found.
 */
function getMetaForPath(pathname) {
  // 1) Static pages
  const staticPages = {
    "/": {
      title: "Haarper | AI solutions, automation & one IT stop shop",
      description:
        "Eliminate operational inefficiencies with AI automation, custom software development, and strategic IT consulting. Scalable solutions for growing businesses.",
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
    "/about/": {
      title: "Learn about Haarper | Haarper",
      description:
        "Learn about Haarper: workflow automation, IT consulting, IT support, and custom software solutions.",
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
    "/events/": {
      title: "Upcoming events and activities | Haarper",
      description:
        "Explore our upcoming events hosted by IT experts and digital strategists. Join us to learn, network, and grow your business.",
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
    "/privacy-policy/": {
      title: "Privacy Policy | Haarper",
      description:
        "Read Haarper’s privacy policy and how we handle personal data.",
      ogImage: DEFAULT_OG_IMAGE,
      type: "website",
    },
  };

  if (staticPages[pathname]) {
    return {
      ...staticPages[pathname],
      authorName: DEFAULT_AUTHOR_NAME,
      authorUrl: DEFAULT_AUTHOR_URL,
    };
  }

  // 2) Dynamic: services
  const serviceSlug = matchSlug(pathname, "/services/");
  if (serviceSlug && services?.[serviceSlug]) {
    const s = services[serviceSlug];
    return {
      title: s.title ? `${s.title} | Haarper` : "Haarper",
      description:
        s.description ||
        "Workflow automation, IT support, custom software & AI solutions for SMEs.",
      ogImage:
        toAbsoluteUrl(s.ogImage) || toAbsoluteUrl(s.image) || DEFAULT_OG_IMAGE,
      type: "article", // or "website" if you prefer
      authorName: s.authorName || DEFAULT_AUTHOR_NAME,
      authorUrl: s.authorUrl || DEFAULT_AUTHOR_URL,
      publishedTime: s.publishedTime || null,
      modifiedTime: s.modifiedTime || s.publishedTime || null,
    };
  }

  // 3) Dynamic: events (example)
  // If your event detail route is /events/:slug, you can do:
  //
  // const eventSlug = matchSlug(pathname, "/events/");
  // if (eventSlug && events?.[eventSlug]) {
  //   const e = events[eventSlug];
  //   return {
  //     title: e.title ? `${e.title} | Haarper` : "Haarper",
  //     description: e.description || "Event by Haarper.",
  //     ogImage: toAbsoluteUrl(e.ogImage) || toAbsoluteUrl(e.image) || DEFAULT_OG_IMAGE,
  //     type: "article",
  //     authorName: e.authorName || DEFAULT_AUTHOR_NAME,
  //     authorUrl: e.authorUrl || DEFAULT_AUTHOR_URL,
  //     publishedTime: e.dateIso || null, // if you have it
  //     modifiedTime: e.updatedIso || e.dateIso || null,
  //   };
  // }

  // 4) Not found / fallback

  const eventSlug = matchSlug(pathname, "/events/");
  if (eventSlug && events?.[eventSlug]) {
    const e = events[eventSlug];

    return {
      title: e.title ? `${e.title} | Haarper` : "Haarper",
      description: e.description || "Event by Haarper.",
      ogImage:
        toAbsoluteUrl(e.ogImage) || toAbsoluteUrl(e.image) || DEFAULT_OG_IMAGE,
      type: "article",
      authorName: DEFAULT_AUTHOR_NAME,
      authorUrl: DEFAULT_AUTHOR_URL,
      publishedTime: e.dateIso || null,
      modifiedTime: e.dateIso || null,
    };
  }

  const caseSlug = matchSlug(pathname, "/case-studies/");
  if (caseSlug && cases?.[caseSlug]) {
    const e = cases[caseSlug];
    return {
      title: e.title ? `${e.title} | Haarper` : "Haarper",
      description: e.description || "Case study by Haarper.",
      ogImage:
        toAbsoluteUrl(e.ogImage) || toAbsoluteUrl(e.image) || DEFAULT_OG_IMAGE,
      type: "article",
      authorName: e.authorName || DEFAULT_AUTHOR_NAME,
      authorUrl: e.authorUrl || DEFAULT_AUTHOR_URL,
      publishedTime: e.dateIso || null, // if you have it
      modifiedTime: e.updatedIso || e.dateIso || null,
    };
  }
  return {
    title: "Haarper",
    description:
      "Workflow automation, IT support, custom software & AI solutions.",
    ogImage: DEFAULT_OG_IMAGE,
    type: "website",
    authorName: DEFAULT_AUTHOR_NAME,
    authorUrl: DEFAULT_AUTHOR_URL,
  };
}

function headForUrl(urlPath) {
  const pathname = canonicalPath(urlPath);
  const canonical = `${SITE_URL}${pathname}`;

  const meta = getMetaForPath(pathname);

  const elements = [
    { type: "link", props: { rel: "canonical", href: canonical } },

    { type: "meta", props: { name: "description", content: meta.description } },

    // Open Graph
    { type: "meta", props: { property: "og:site_name", content: "Haarper" } },
    { type: "meta", props: { property: "og:title", content: meta.title } },
    {
      type: "meta",
      props: { property: "og:description", content: meta.description },
    },
    { type: "meta", props: { property: "og:url", content: canonical } },
    { type: "meta", props: { property: "og:type", content: meta.type } },

    { type: "meta", props: { property: "og:image", content: meta.ogImage } },
    {
      type: "meta",
      props: { property: "og:image:secure_url", content: meta.ogImage },
    },
    { type: "meta", props: { property: "og:image:width", content: "1200" } },
    { type: "meta", props: { property: "og:image:height", content: "630" } },

    // Twitter
    {
      type: "meta",
      props: { name: "twitter:card", content: "summary_large_image" },
    },
    { type: "meta", props: { name: "twitter:title", content: meta.title } },
    {
      type: "meta",
      props: { name: "twitter:description", content: meta.description },
    },
    { type: "meta", props: { name: "twitter:image", content: meta.ogImage } },

    // Author (standard HTML)
    { type: "meta", props: { name: "author", content: meta.authorName } },
  ];

  // Article-specific author/time (only if type=article)
  if (meta.type === "article") {
    elements.push({
      type: "meta",
      props: { property: "article:author", content: meta.authorUrl },
    });

    if (meta.publishedTime) {
      elements.push({
        type: "meta",
        props: {
          property: "article:published_time",
          content: meta.publishedTime,
        },
      });
    }
    if (meta.modifiedTime) {
      elements.push({
        type: "meta",
        props: {
          property: "article:modified_time",
          content: meta.modifiedTime,
        },
      });
    }
  }

  return { title: meta.title, elements };
}

export async function prerender(data) {
  const urlPath = data?.url || "/";

  const appHtml = renderToString(
    <StaticRouter location={urlPath}>
      <AppLayout />
    </StaticRouter>
  );

  return {
    html: appHtml,
    head: headForUrl(urlPath),
  };
}
