import { createPageMetadata } from "@/utils/metadata";
import { siteSections } from "@/resources/site-sections";
import { CollectionProject } from "@/components/CollectionProject";
import styles from "@/components/CollectionPages.module.css";

export const metadata = createPageMetadata({
  title: "Projects — Aiden Song",
  description: "Independent research, education, and interactive projects by Aiden Song.",
  path: "/projects",
});

export default function Projects() {
  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <header className={styles.heading}>
        <h1>Projects</h1>
        <p>Independent research, education, and interactive work.</p>
      </header>
      <CollectionProject slug="shishijie" featured />
      <section className={styles.section} aria-labelledby="projects-title">
        <h2 id="projects-title">Research &amp; Initiatives</h2>
        <div className={`${styles.sectionBody} ${styles.illustratedList}`}>
          {siteSections.projects.slugs.slice(1).map((slug) => (
            <CollectionProject
              key={slug}
              slug={slug}
              summary={
                slug === "alphadeer" ? "A student-led initiative in AI education." : undefined
              }
            />
          ))}
          <details className={styles.details}>
            <summary>Earlier Research</summary>
            <div className={styles.entry}>
              <h3>Zebrafish Caudal-Fin Regeneration</h3>
              <p className={styles.period}>2023 — 2024</p>
              <p>
                Through a Chinese Academy of Sciences opportunity, I investigated
                temperature-dependent fin regeneration. My report placed second in the Shanghai
                Science Association for Young Talent.
              </p>
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
