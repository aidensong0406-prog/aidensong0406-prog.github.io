import type { MetadataRoute } from "next";
import { baseURL } from "@/resources";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(new URL(baseURL).hostname);

  return {
    rules: { userAgent: "*", disallow: isLocal ? "/" : "/api/" },
    ...(isLocal ? {} : { sitemap: `${baseURL}/sitemap.xml` }),
  };
}
