import { LegacyPageRedirect } from "@/components/LegacyPageRedirect";
import { createPageMetadata } from "@/utils/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Impact — Aiden Song",
    description: "Exhibitions, education, and a digital museum.",
    path: "/impact",
  }),
  robots: { index: false, follow: true },
};

export default function Projects() {
  return <LegacyPageRedirect title="Impact" href="/impact/" />;
}
