import { Link } from "next-view-transitions";
import { ActionArrow } from "@/components/ActionArrow";
import { createPageMetadata } from "@/utils/metadata";
import styles from "./community.module.css";

export const metadata = createPageMetadata({
  title: "Community — Aiden Song",
  description:
    "Crescent Philharmonic, the Mathematical Modeling Club, and open-source work on Kaggle: three ways I learn with other people.",
  path: "/community",
});

export default function Community() {
  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <header className={styles.heading}>
        <h1>Community</h1>
        <p>
          Making room for other people’s ideas through music, mathematical modeling, and shared code.
        </p>
      </header>

      <div className={styles.experiences}>
        <section id="music" className={styles.experience} aria-labelledby="orchestra-title">
          <header className={styles.experienceHeader}>
            <div>
              <h2 id="orchestra-title">Crescent Philharmonic</h2>
              <p>Orchestra leadership and community performances</p>
            </div>
            <span className={styles.period}>2024 — Present</span>
          </header>

          <div className={styles.musicBody}>
            <figure className={styles.performance}>
              {/* biome-ignore lint/a11y/useMediaCaption: This instrumental performance contains no spoken dialogue to caption. */}
              <video
                controls
                playsInline
                preload="none"
                poster="/images/projects/orchestra/performance-preview.jpg"
                aria-label="Crescent Philharmonic school performance"
                aria-describedby="performance-caption"
              >
                <source src="/videos/orchestra/school-performance.mp4" type="video/mp4" />
              </video>
              <figcaption id="performance-caption">School performance excerpt, 1:16.</figcaption>
            </figure>
            <div className={styles.prose}>
              <p>
                Inspired by Gershwin’s <em>Rhapsody in Blue</em>, I brought our school’s strings
                and winds together. Hospital performances later taught me to stay after the bow
                and listen.
              </p>
            </div>
          </div>

          <Link className={styles.projectLink} href="/work/crescent-philharmonic">
            Founding story &amp; performances <ActionArrow />
          </Link>
        </section>

        <section id="modeling" className={styles.experience} aria-labelledby="modeling-title">
          <header className={styles.experienceHeader}>
            <div>
              <h2 id="modeling-title">Mathematical Modeling Club</h2>
              <p>Student-led mathematics and teaching</p>
            </div>
            <span className={styles.period}>2023 — Present</span>
          </header>
          <p className={styles.summary}>
            My starter notebooks give 100+ students a place to begin, question assumptions, and
            build on each other’s ideas.
          </p>
          <Link className={styles.projectLink} href="/work/mathematical-modeling-club">
            Explore the Modeling Club <ActionArrow />
          </Link>
        </section>

        <section id="open-source" className={styles.experience} aria-labelledby="kaggle-title">
          <header className={styles.experienceHeader}>
            <div>
              <h2 id="kaggle-title">Kaggle</h2>
              <p>Open-source notebooks and machine learning</p>
            </div>
            <span className={styles.period}>2024 — Present</span>
          </header>
          <p className={styles.summary}>
            I publish notebooks others can adapt and extend, with more than 600 upvotes and 400 forks.
          </p>
        </section>
      </div>
    </main>
  );
}
