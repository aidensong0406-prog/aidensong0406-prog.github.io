type SiteSection = {
  label: string;
  path: string;
  slugs: string[];
};

export const siteSections: Record<"research" | "impact" | "community", SiteSection> = {
  research: {
    label: "Research",
    path: "/research",
    slugs: ["density-driven-flows", "computational-oceanography", "yangtze-expedition"],
  },
  impact: {
    label: "Impact",
    path: "/impact",
    slugs: ["glacier-week", "alphadeer", "shishijie"],
  },
  community: {
    label: "Community",
    path: "/community",
    slugs: ["crescent-philharmonic", "mathematical-modeling-club"],
  },
};

export function getProjectSection(slug: string): SiteSection | undefined {
  return Object.values(siteSections).find((section) => section.slugs.includes(slug));
}
