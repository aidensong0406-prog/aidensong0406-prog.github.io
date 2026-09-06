"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { getProject, honors } from "@/resources/portfolio";
import { transitionProfile } from "@/utils/viewTransitions";
import { ActionArrow } from "./ActionArrow";
import { ProjectArtwork } from "./ProjectArtwork";
import styles from "./HonorsPanel.module.css";

const researchAwards = honors.filter((item) => item.project === "density-driven-flows");
const academicAwards = honors.filter((item) => !item.project);
const glacierWeek = getProject("glacier-week");
const seaBeyond = honors.find((item) => item.project === "glacier-week");
const announcement = glacierWeek.gallery?.find((item) => item.title === "Sea Beyond Recognition");

export function HonorsPage() {
  const [year, setYear] = useState("All");
  return (
    <div className={`${styles.standalone} profile-panel`}>
      <HonorsPanel year={year} onYearChange={setYear} standalone />
    </div>
  );
}

export function HonorsPanel({
  year,
  onYearChange,
  standalone = false,
}: { year: string; onYearChange: (year: string) => void; standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const SectionHeading = standalone ? "h2" : "h3";
  const AwardHeading = standalone ? "h3" : "h4";
  const visibleAwards = academicAwards.filter(
    (item) =>
      year === "All" || item.year.includes(year) || (year === "2026" && item.year.includes("–26")),
  );

  return (
    <div className={styles.honors}>
      <div className={styles.heading}>
        <Heading>Honors</Heading>
        <span>2024 — 2026</span>
      </div>

      {seaBeyond && (
        <article className={styles.feature} aria-labelledby="sea-beyond-title">
          <div className={styles.featureImage}>
            <ProjectArtwork
              visual={null}
              media={glacierWeek.cover}
              priority
              sizes="(max-width: 600px) 94vw, 400px"
            />
          </div>
          <div className={styles.featureCopy}>
            <header className={styles.featureHeading}>
              <SectionHeading id="sea-beyond-title">{seaBeyond.name}</SectionHeading>
              <span>{seaBeyond.year}</span>
            </header>
            <div className={styles.featureDetails}>
              <p className={styles.placement}>1st Place</p>
              <p>Global award in the Glaciers category, with €5,000 in sponsorship for Frozen Voices.</p>
            </div>
            <div className={styles.featureActions}>
              <Link className={styles.projectLink} href="/work/glacier-week">
                View Glacier Week <ActionArrow />
              </Link>
              {announcement && (
                <a className={styles.evidenceLink} href={announcement.src} target="_blank" rel="noreferrer">
                  Award announcement <ActionArrow direction="external" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </article>
      )}

      <section className={styles.research} aria-labelledby="research-awards-title">
        <header className={styles.sectionHeading}>
          <SectionHeading id="research-awards-title">Research Awards</SectionHeading>
          <Link className={styles.researchLink} href="/work/density-driven-flows">
            Density-Driven Flow Simulation <ActionArrow />
          </Link>
        </header>
        <div className={styles.researchAwards}>
          {researchAwards.map((item) => (
            <article key={item.name}>
              <div className={styles.awardHeading}>
                <AwardHeading>{item.name}</AwardHeading>
                <span>{item.year}</span>
              </div>
              <p className={styles.placement}>{item.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.academic} aria-labelledby="academic-awards-title">
        <div className={styles.registerHeading}>
          <SectionHeading id="academic-awards-title">Academic Competitions</SectionHeading>
          <fieldset className={styles.filters}>
            <legend className="sr-only">Filter academic competitions by year</legend>
            {["All", "2026", "2025", "2024"].map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={year === item}
                aria-controls="academic-award-records"
                onClick={() => {
                  if (year !== item) transitionProfile(() => onYearChange(item));
                }}
              >
                {item}
              </button>
            ))}
          </fieldset>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing {visibleAwards.length} academic competition results
          {year === "All" ? "" : ` from ${year}`}
        </p>
        <div className={styles.records} id="academic-award-records">
          {visibleAwards.map((item) => (
            <article key={item.name} className={styles.record}>
              <div className={styles.awardHeading}>
                <AwardHeading>{item.name}</AwardHeading>
                <span>{item.year}</span>
              </div>
              <p>{item.result}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
