import { LegacyPageRedirect } from "@/components/LegacyPageRedirect";
import { createPageMetadata } from "@/utils/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Research — Aiden Song",
    description: "Explore Aiden Song’s projects and research.",
    path: "/research",
  }),
  robots: { index: false, follow: true },
};

export default function Work() {
  return (
    <LegacyPageRedirect
      title="Research"
      href="/research/"
      hashRedirects={{
        "#Research": "/research/#research-fieldwork",
        "#research": "/research/#research-fieldwork",
      }}
    />
  );
}
