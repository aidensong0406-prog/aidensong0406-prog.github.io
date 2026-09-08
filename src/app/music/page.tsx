import { LegacyPageRedirect } from "@/components/LegacyPageRedirect";
import { createPageMetadata } from "@/utils/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Community — Aiden Song",
    description: "Crescent Philharmonic: music, leadership, and listening after the bow.",
    path: "/community",
  }),
  robots: { index: false, follow: true },
};

export default function Music() {
  return <LegacyPageRedirect title="Community" href="/community/#music" />;
}
