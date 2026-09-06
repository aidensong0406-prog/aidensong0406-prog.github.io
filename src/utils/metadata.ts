import type { Metadata } from "next";
import { baseURL, person } from "@/resources";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function createPageMetadata({ title, description, path, image }: PageMetadata): Metadata {
  const canonical = new URL(path, baseURL).href;
  const imageURL = new URL(image || "/og.png", baseURL).href;

  return {
    metadataBase: new URL(baseURL),
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: person.name,
      images: [{ url: imageURL, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageURL, alt: title }],
    },
  };
}
