type SiteSection = {
  label: string;
  path: string;
  slugs: string[];
};

export const siteSections: Record<"climate" | "music" | "projects", SiteSection> = {
  climate: {
    label: "Climate",
    path: "/climate",
    slugs: ["computational-oceanography", "yangtze-expedition", "glacier-week"],
  },
  music: {
    label: "Music",
    path: "/music",
    slugs: ["crescent-philharmonic"],
  },
  projects: {
    label: "Projects",
    path: "/projects",
    slugs: ["shishijie", "density-driven-flows", "alphadeer", "mathematical-modeling-club"],
  },
};

export function getProjectSection(slug: string): SiteSection | undefined {
  return Object.values(siteSections).find((section) => section.slugs.includes(slug));
}
