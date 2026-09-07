import { LegacyPageRedirect } from "@/components/LegacyPageRedirect";
import { createPageMetadata } from "@/utils/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Projects — Aiden Song",
    description: "Explore Aiden Song’s projects and research.",
    path: "/projects",
  }),
  robots: { index: false, follow: true },
};

export default function Work() {
  return (
    <LegacyPageRedirect
      title="Projects"
      href="/projects/"
      hashRedirects={{
        "#Research": "/climate/#research-fieldwork",
        "#research": "/climate/#research-fieldwork",
      }}
    />
  );
}
