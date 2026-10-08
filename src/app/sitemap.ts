import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const routes = [
    "",
    "/halls",
    "/royal-convention",
    "/royal-banquets",
    "/vaishnavi-vaidehi",
    "/nannapaneni-lakshmi",
    "/other-venues",
    "/accommodation",
    "/gallery",
    "/facilities",
    "/about-us",
    "/check-availability",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/check-availability" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/royal-") ? 0.9 : 0.8,
  }));
}
