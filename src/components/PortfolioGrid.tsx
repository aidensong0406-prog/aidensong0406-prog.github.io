"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import { projects, type Project } from "@/resources/portfolio";
import { ProjectArtwork } from "./ProjectArtwork";
import { ActionArrow } from "./ActionArrow";

export function PortfolioCard({
  project,
  heading = "h3",
}: { project: Project; heading?: "h2" | "h3" }) {
  const Heading = heading;
  const hasArtwork = Boolean(project.cover || project.visual);
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`portfolio-card ${!hasArtwork ? "portfolio-card-text" : ""}`}
    >
      {hasArtwork && <ProjectArtwork visual={project.visual} media={project.cover} />}
      <div className="portfolio-card-copy">
        <div className="card-title action-heading">
          <Heading>{project.title}</Heading>
          <ActionArrow />
        </div>
        <p>{project.summary}</p>
        {project.status && <p className="project-status">{project.status}</p>}
      </div>
    </Link>
  );
}

export function PortfolioGrid() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Research", "Leadership", "Creative"];
  useEffect(() => {
    const sync = () =>
      setFilter(
        ["All", "Research", "Leadership", "Creative"].find(
          (category) =>
            category.toLowerCase() ===
            window.location.hash.slice(1).toLowerCase().replace("community", "leadership"),
        ) ?? "All",
      );
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);
  function selectFilter(category: string) {
    setFilter(category);
    const hash = category === "All" ? "" : `#${category}`;
    if (window.location.hash !== hash)
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${hash}`,
      );
  }
  const filtered = projects.filter((p) => filter === "All" || p.category === filter);
  return (
    <>
      <fieldset className="project-filters" data-js-only>
        <legend className="sr-only">Filter experiences</legend>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            onClick={() => selectFilter(category)}
          >
            {category}
          </button>
        ))}
      </fieldset>
      <p className="sr-only" aria-live="polite">
        Showing {filtered.length} experiences
      </p>
      <div className="portfolio-grid">
        {filtered.map((project) => (
          <PortfolioCard key={project.slug} project={project} heading="h2" />
        ))}
      </div>
    </>
  );
}
