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
          Alongside my research, I explore how people find a personal connection to an unfamiliar
          subject — through a meal, a game, or the quiet act of looking.
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
            I first imagined Glacier Week as posters and a melting-ice installation. Both still made
            glacier loss feel distant, so I connected it to familiar food: visitors became diners,
            with a game and videos offering other ways to join in.
          </p>
          <p>
            Across four days and more than 84 visiting classes, I learned to start with an
            experience someone could enter, then build toward the science.
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
            Lighting controls and observations accompany a synthetic study specimen in the browser
            prototype.
          </figcaption>
        </figure>
        <div className={styles.copy}>
          <div className={styles.projectHeading}>
            <h2 id="museum-title">Shishijie</h2>
            <p>From a Family Collection to a Digital Museum</p>
          </div>
          <p>
            At home, my family turns Yangtze stones and moves lamps until a shape appears. A
            photograph captured the object but left out that shared ritual. In Shishijie, visitors
            can rotate an exhibit, change its lighting, and search for their own patterns.
          </p>
          <p>Designing it has made me ask which features help someone look more carefully.</p>
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
            I am preparing an exhibition through Alphadeer, a separate education initiative. My work
            also includes translating UNESCO’s student AI competency framework into Chinese and
            researching how students learn about AI.
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
