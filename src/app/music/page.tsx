import { Link } from "next-view-transitions";
import { createPageMetadata } from "@/utils/metadata";
import { getProject } from "@/resources/portfolio";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "@/components/CollectionPages.module.css";

export const metadata = createPageMetadata({
  title: "Music — Aiden Song",
  description: "Crescent Philharmonic Orchestra, school concerts, and community performances.",
  path: "/music",
});

export default function Music() {
  const orchestra = getProject("crescent-philharmonic");
  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <header className={styles.heading}>
        <h1>Music</h1>
        <p>
          I founded Crescent Philharmonic to bring our school’s string and wind musicians together.
        </p>
      </header>
      <figure className={`${styles.figure} ${styles.musicFigure}`}>
        <div className={styles.heroImage}>
          <ProjectArtwork
            visual={null}
            media={orchestra.cover}
            priority
            sizes="(max-width: 1100px) 94vw, 1100px"
          />
        </div>
        <figcaption>Crescent Philharmonic Orchestra in performance.</figcaption>
      </figure>
      <section className={styles.section} aria-labelledby="orchestra-title">
        <h2 id="orchestra-title">Crescent Philharmonic</h2>
        <div className={styles.musicIntro}>
          <p>
            Since September 2024, I have led the school’s first full orchestra, bringing together
            more than 100 active members for shared rehearsals, concerts, and community service.
          </p>
          <Link className="action-inline" href="/work/crescent-philharmonic">
            Orchestra Experience <ActionArrow />
          </Link>
        </div>
      </section>
      <section className={styles.section} aria-labelledby="performances-title">
        <h2 id="performances-title">Performances</h2>
        <div className={styles.musicStories}>
          <article className={styles.entry}>
            <h3>Community Performances</h3>
            <p>
              I organized more than 30 volunteer musicians for weekly performances at Ruijin
              Hospital and Youyouxin Nursing Home. Together, we contributed over 100 hours of
              service.
            </p>
          </article>
          <article className={styles.entry}>
            <h3>School Concerts</h3>
            <p>
              I organized and led a concert for more than 500 listeners. Our orchestra also
              performed at the school art festival and the school’s first student-led concert.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
