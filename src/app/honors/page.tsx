import { LegacyPageRedirect } from "@/components/LegacyPageRedirect";
import { createPageMetadata } from "@/utils/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Honors — Aiden Song",
    description: "Honors and awards in environmental education, research, and academic competitions.",
    path: "/about",
  }),
  robots: { index: false, follow: true },
};

export default function Honors() {
  return <LegacyPageRedirect title="Honors" href="/about/#recognition" />;
}
