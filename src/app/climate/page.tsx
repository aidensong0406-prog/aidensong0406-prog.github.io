import { LegacyPageRedirect } from "@/components/LegacyPageRedirect";
import { createPageMetadata } from "@/utils/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Research — Aiden Song",
    description: "The questions connecting fluid experiments, ocean models, and Yangtze fieldwork.",
    path: "/research",
  }),
  robots: { index: false, follow: true },
};

export default function Climate() {
  return (
    <LegacyPageRedirect
      title="Research"
      href="/research/"
      hashRedirects={{
        "#question": "/research/#question",
        "#research-fieldwork": "/research/#research-fieldwork",
        "#field-observation": "/research/#field-observation",
        "#education-outreach": "/impact/",
        "#reflection": "/research/#reflection",
      }}
    />
  );
}
