import { Link } from "next-view-transitions";
import { ActionArrow } from "@/components/ActionArrow";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { getProject } from "@/resources/portfolio";
import { createPageMetadata } from "@/utils/metadata";
import styles from "./research.module.css";

export const metadata = createPageMetadata({
  title: "Research — Aiden Song",
  description:
    "From Yangtze river stones to density currents, physics-informed AI, coastal forecasting, and field observation: the questions behind my research.",
  path: "/research",
});

export default function Research() {
  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <header className={styles.heading} id="question">
        <h1>Research</h1>
        <p>How much can we understand about moving water from the traces it leaves?</p>
      </header>

      <section className={styles.origin} aria-labelledby="origin-title">
        <figure className={styles.figure}>
          <div className={styles.tankImage}>
            <ProjectArtwork
              visual={null}
              media={getProject("density-driven-flows").cover}
              priority
              sizes="(max-width: 760px) 94vw, 550px"
            />
          </div>
          <figcaption>A lock-exchange experiment makes a density current visible.</figcaption>
        </figure>
        <div className={styles.copy}>
          <h2 id="origin-title">The Question</h2>
          <p>
            Collecting Yangtze stones led me to build a lock-exchange tank and ask what physics could
            reveal about currents beyond the motion I could see.
          </p>
          <Link className={styles.textLink} href="/work/density-driven-flows">
            Explore the experiment <ActionArrow />
          </Link>
        </div>
      </section>

      <section id="research-fieldwork" className={styles.section} aria-labelledby="models-title">
        <h2 id="models-title">Computational Research</h2>
        <div className={styles.models}>
          <article className={styles.copy}>
            <div>
              <h3>PINN-LOCK</h3>
              <p className={styles.period}>April 2024 — February 2026</p>
            </div>
            <p>
              I developed physics-informed neural networks to reconstruct density-driven flows from
              sparse observations, testing their predictions against simulated reference fields.
            </p>
            <Link className={styles.textLink} href="/work/density-driven-flows">
              Method and results <ActionArrow />
            </Link>
            <a className={styles.document} href="/papers/pinn-lock-research-manuscript.pdf">
              <span>
                Research Manuscript<span>Unpublished, PDF</span>
              </span>
              <ActionArrow />
            </a>
          </article>
          <article className={styles.copy}>
            <div>
              <h3>Storm-Surge Prediction</h3>
              <p className={styles.period}>June — August 2026, ECNU</p>
            </div>
            <p>
              At ECNU, I used MeshGraphNets to forecast storm-driven coastal water levels, extending
              my work from reconstructing flows to predicting their evolution.
            </p>
            <Link className={styles.textLink} href="/work/computational-oceanography">
              Research details <ActionArrow />
            </Link>
          </article>
        </div>
      </section>

      <section
        id="field-observation"
        className={`${styles.section} ${styles.field}`}
        aria-labelledby="field-title"
      >
        <div className={styles.copy}>
          <h2 id="field-title">Yangtze Fieldwork</h2>
          <p className={styles.period}>June — July 2026</p>
          <dl className={styles.fieldFacts}>
            <div>
              <dt>Cities visited</dt>
              <dd>10+</dd>
            </div>
            <div>
              <dt>Water samples</dt>
              <dd>30+</dd>
            </div>
            <div>
              <dt>Interviews</dt>
              <dd>50+</dd>
            </div>
          </dl>
        </div>
        <div className={styles.copy}>
          <p>
            Sampling and interviews along the Yangtze taught me to revise my plans when difficult
            terrain and local stories challenged my assumptions.
          </p>
          <Link className={styles.textLink} href="/work/yangtze-expedition">
            Field notes and reflections <ActionArrow />
          </Link>
        </div>
      </section>

      <section
        id="reflection"
        className={`${styles.section} ${styles.reflection}`}
        aria-labelledby="reflection-title"
      >
        <h2 id="reflection-title">Reflection</h2>
        <div className={styles.copy}>
          <p>
            Models reveal patterns; fieldwork taught me when to measure again, revise an assumption,
            or listen to a question I had not anticipated.
          </p>
          <Link className={styles.textLink} href="/impact">
            From research to public impact <ActionArrow />
          </Link>
        </div>
      </section>

      <details className={styles.details}>
        <summary>Earlier Research</summary>
        <div className={styles.models}>
          <article className={styles.copy}>
            <h3>Atlantic Meridional Overturning Circulation</h3>
            <p className={styles.period}>2023 — 2024</p>
            <p>
              I used oceanographic records and physical modeling to investigate weakening
              circulation and freshwater input.
            </p>
          </article>
          <article className={styles.copy}>
            <h3>Zebrafish Caudal-Fin Regeneration</h3>
            <p className={styles.period}>2023 — 2024</p>
            <p>
              Through a Chinese Academy of Sciences opportunity, I investigated
              temperature-dependent fin regeneration.
            </p>
          </article>
        </div>
      </details>
    </main>
  );
}
