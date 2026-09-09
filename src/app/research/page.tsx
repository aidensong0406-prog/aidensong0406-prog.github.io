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
        <div className={styles.copy}>
          <p>How much can we understand about moving water from the traces it leaves?</p>
          <p>My interest began with patterned Yangtze stones and the water that shaped them.</p>
        </div>
      </header>

      <section className={styles.background} aria-labelledby="background-title">
        <div>
          <h2 id="background-title">Ocean Circulation</h2>
          <p className={styles.period}>2023 — 2024</p>
        </div>
        <p>
          I studied Atlantic Meridional Overturning Circulation through oceanographic records and
          physical modeling, investigating weakening circulation and freshwater input.
        </p>
      </section>

      <section id="research-fieldwork" className={styles.section} aria-labelledby="models-title">
        <h2 id="models-title">Computational Research</h2>
        <div className={styles.models}>
          <article className={styles.feature} aria-labelledby="pinn-title">
            <figure className={styles.figure}>
              <div className={styles.tankImage}>
                <ProjectArtwork
                  visual={null}
                  media={getProject("density-driven-flows").cover}
                  priority
                  sizes="(max-width: 760px) 94vw, 520px"
                />
              </div>
              <figcaption>A lock-exchange tank makes a density current visible.</figcaption>
            </figure>
            <div className={styles.copy}>
              <div>
                <h3 id="pinn-title">PINN-LOCK: Reconstructing Density Currents</h3>
                <p className={styles.period}>April 2024 — February 2026</p>
              </div>
              <p>
                I developed physics-informed neural networks to recover density-driven flows from
                sparse observations, comparing their reconstructions with simulated reference fields.
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
            </div>
          </article>
          <article className={styles.researchEntry} aria-labelledby="storm-title">
            <div>
              <h3 id="storm-title">Storm-Surge Prediction</h3>
              <p className={styles.period}>June — August 2026, ECNU</p>
            </div>
            <div className={styles.copy}>
              <p>
                At ECNU, I used MeshGraphNets to forecast coastal water levels, extending my work
                from reconstructing motion to predicting change.
              </p>
              <Link className={styles.textLink} href="/work/computational-oceanography">
                Forecasting research <ActionArrow />
              </Link>
            </div>
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
          <p>
            Sampling and interviews challenged my assumptions about access and local lives. I learned
            to adapt the plan and listen beyond my questionnaire.
          </p>
          <Link className={styles.textLink} href="/work/yangtze-expedition">
            Field notes and reflections <ActionArrow />
          </Link>
        </div>
        <div className={styles.fieldEvidence}>
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
      </section>

      <details className={styles.details}>
        <summary>Earlier Laboratory Research</summary>
        <article className={styles.earlierResearch}>
          <div>
            <h3>Zebrafish Caudal-Fin Regeneration</h3>
            <p className={styles.period}>2023 — 2024</p>
          </div>
          <p>
            Through a Chinese Academy of Sciences opportunity, I investigated temperature-dependent
            fin regeneration.
          </p>
        </article>
      </details>

      <section
        id="reflection"
        className={`${styles.section} ${styles.reflection}`}
        aria-labelledby="reflection-title"
      >
        <h2 id="reflection-title">Reflection</h2>
        <div className={styles.copy}>
          <p>
            Models reveal patterns; fieldwork taught me when to measure again, revise an assumption,
            or listen. Public education asks how to make that curiosity accessible to others.
          </p>
          <Link className={styles.textLink} href="/work/glacier-week">
            Public engagement: Glacier Week <ActionArrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
