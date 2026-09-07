import { Link } from "next-view-transitions";
import { createPageMetadata } from "@/utils/metadata";
import { community, getProject } from "@/resources/portfolio";
import { CollectionProject } from "@/components/CollectionProject";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { ActionArrow } from "@/components/ActionArrow";
import styles from "@/components/CollectionPages.module.css";

export const metadata = createPageMetadata({
  title: "Climate — Aiden Song",
  description: "Ocean modeling, field observations, and public climate education.",
  path: "/climate",
});

export default function Climate() {
  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <div className={styles.climateHero}>
        <header className={styles.heading}>
          <h1>Climate</h1>
          <p>Ocean modeling, field observations, and public climate education.</p>
          <nav className={styles.sectionLinks} aria-label="Climate sections">
            <a href="#research-fieldwork">
              Research &amp; Fieldwork <ActionArrow direction="down" />
            </a>
            <a href="#education-outreach">
              Education &amp; Outreach <ActionArrow direction="down" />
            </a>
          </nav>
        </header>
        <figure className={styles.figure}>
          <div className={styles.heroImage}>
            <ProjectArtwork visual={null} media={getProject("glacier-week").cover} priority />
          </div>
          <figcaption>Students at the SHSID Glacier Week exhibition, 2026.</figcaption>
        </figure>
      </div>

      <section className={styles.section} id="research-fieldwork" aria-labelledby="research-title">
        <h2 id="research-title">Research &amp; Fieldwork</h2>
        <div className={styles.sectionBody}>
          <CollectionProject slug="computational-oceanography" />
          <CollectionProject slug="yangtze-expedition" />
          <details className={styles.details}>
            <summary>Earlier Research</summary>
            <div className={styles.entry}>
              <h3>Atlantic Meridional Overturning Circulation</h3>
              <p className={styles.period}>2023 — 2024</p>
              <p>
                I used oceanographic records and physical modeling to investigate weakening
                circulation and freshwater input.
              </p>
            </div>
          </details>
        </div>
      </section>

      <section className={styles.section} id="education-outreach" aria-labelledby="outreach-title">
        <h2 id="outreach-title">Education &amp; Outreach</h2>
        <div className={styles.sectionBody}>
          <CollectionProject slug="glacier-week" showImage={false} />
          <details className={styles.details}>
            <summary>Climate Collaboration &amp; Ocean Service</summary>
            {community.slice(2).map((item) => (
              <article className={styles.entry} key={item.title}>
                <h3>{item.title}</h3>
                <p className={styles.period}>{item.period}</p>
                <p>{item.text}</p>
              </article>
            ))}
          </details>
          <Link className={styles.crossReference} href="/work/alphadeer">
            <div>
              <h3>Alphadeer Climate Seminars</h3>
              <p>Our team secured speakers for more than ten online climate seminars.</p>
            </div>
            <ActionArrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
