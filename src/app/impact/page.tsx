import { Link } from "next-view-transitions";
import { ActionArrow } from "@/components/ActionArrow";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { community, getProject } from "@/resources/portfolio";
import { createPageMetadata } from "@/utils/metadata";
import styles from "./impact.module.css";

export const metadata = createPageMetadata({
  title: "Impact — Aiden Song",
  description:
    "Glacier Week, Shishijie, and Alphadeer: inviting people to participate in science, observation, and learning.",
  path: "/impact",
});

export default function Impact() {
  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <header className={styles.heading}>
        <h1>Impact</h1>
        <p>
          I bring science and observation into everyday experience through exhibitions, shared family
          rituals, and education.
        </p>
      </header>

      <section className={styles.feature} aria-labelledby="glacier-title">
        <figure className={styles.figure}>
          <div className={styles.image}>
            <ProjectArtwork
              visual={null}
              media={getProject("glacier-week").cover}
              priority
              sizes="(max-width: 760px) 100vw, 540px"
            />
          </div>
          <figcaption>Students exploring the SHSID Glacier Week exhibition.</figcaption>
        </figure>
        <div className={styles.copy}>
          <h2 id="glacier-title">Glacier Week</h2>
          <p>
            To make glacier loss feel personal, I created a four-day exhibition for 84+ classes with
            familiar food, melting ice, and an interactive game.
          </p>
          <Link className={styles.textLink} href="/work/glacier-week">
            Exhibition &amp; Film <ActionArrow />
          </Link>
        </div>
      </section>

      <section className={`${styles.feature} ${styles.museum}`} aria-labelledby="museum-title">
        <figure className={styles.figure}>
          <div className={styles.image}>
            <ProjectArtwork
              visual={null}
              media={getProject("shishijie").cover}
              sizes="(max-width: 760px) 100vw, 540px"
            />
          </div>
          <figcaption>
            Browser prototype with a synthetic study specimen.
          </figcaption>
        </figure>
        <div className={styles.copy}>
          <div className={styles.projectHeading}>
            <h2 id="museum-title">Shishijie</h2>
            <p>From a Family Collection to a Digital Museum</p>
          </div>
          <p>
            Inspired by my family’s ritual of turning Yangtze stones under a lamp, I built a museum
            where visitors discover patterns through movement and light.
          </p>
          <Link className={styles.textLink} href="/work/shishijie">
            Explore Shishijie <ActionArrow />
          </Link>
        </div>
      </section>

      <section className={styles.initiative} aria-labelledby="alphadeer-title">
        <div className={styles.initiativeHeading}>
          <div className={styles.logo}>
            <ProjectArtwork visual={null} media={getProject("alphadeer").cover} sizes="88px" />
          </div>
          <div className={styles.projectHeading}>
            <h2 id="alphadeer-title">Alphadeer</h2>
            <p>
              Exhibition planned for <time dateTime="2026-09-26">26 September 2026</time>
            </p>
          </div>
        </div>
        <div className={styles.copy}>
          <p>
            I am preparing Alphadeer’s education exhibition, building on my Chinese translation of
            UNESCO’s student AI framework and research into how students learn.
          </p>
          <Link className={styles.textLink} href="/work/alphadeer">
            Explore Alphadeer <ActionArrow />
          </Link>
        </div>
      </section>

      <details id="additional-outreach" className={styles.details}>
        <summary>Additional Outreach</summary>
        <div className={styles.programs}>
          {community.slice(2).map((item) => (
            <article className={styles.copy} key={item.title}>
              <div className={styles.projectHeading}>
                <h3>{item.title}</h3>
                <p className={styles.period}>{item.period}</p>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <Link className={styles.seminarLink} href="/work/alphadeer">
          <span>
            Our Alphadeer team secured speakers for more than ten online climate seminars.
          </span>
          <ActionArrow />
        </Link>
      </details>
    </main>
  );
}
