import type { MetadataRoute } from "next";
import { baseURL, routes } from "@/resources";
import { projects } from "@/resources/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.keys(routes)
    .filter((route) => routes[route as keyof typeof routes])
    .map((route) => ({ url: new URL(route, baseURL).href }));

  if (routes["/work"]) {
    pages.push(
      ...projects.map((project) => ({
        url: new URL(`/work/${project.slug}`, baseURL).href,
      })),
    );
  }

  return pages;
}
