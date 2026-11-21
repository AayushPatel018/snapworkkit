import type { MetadataRoute } from "next";

const BASE_URL = "https://snaptools.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/prompts",
    "/blog",
    "/about",
    "/press",
    "/contact",
    "/privacy-policy",
    "/tools/merge-pdf",
    "/tools/image-to-pdf",
    "/tools/rotate-pdf",
    "/tools/extract-pdf-pages",
    "/tools/remove-pdf-pages",
    "/tools/add-page-numbers",
    "/tools/reverse-pdf",
    "/tools/text-to-pdf",
    "/tools/image-compressor",
    "/tools/attendance-calculator",
    "/tools/cgpa-calculator",
    "/tools/json-formatter",
    "/tools/password-generator",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date("2026-11-21"),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}