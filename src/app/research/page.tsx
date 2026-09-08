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
            My family collected patterned stones from the Yangtze. I first saw landscapes in them;
            later, I wondered about the currents and erosion that made those patterns possible.
          </p>
          <p>
            I built a lock-exchange tank to watch dense water move beneath lighter water. Seeing a
            larger ocean process in miniature raised another question: what could physics and
            computation reveal beyond the motion I could observe?
          </p>
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
              sparse observations. Physical equations help constrain what the model infers between
              measurements; comparisons with simulation reference fields test those reconstructions.
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
              The next challenge was forecasting how water evolves. I worked with MeshGraphNets on
              an ocean model’s triangular mesh, using water-level fields and atmospheric forcing to
              predict storm-induced coastal changes. Moving to this larger, changing system made
              testing a model’s limits even more consequential.
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
            Returning to the Yangtze gave me a different kind of evidence. I planned sampling sites
            around confluences and geographic variety, but some map markers led to cliffs or
            overgrown paths. Near 3,000 meters above sea level, reaching the water required finding
            a staircase and a muddy path that my plan could not show.
          </p>
          <p>
            Conversations also outgrew my questionnaire. A boat operator described tourism; other
            interviewees spoke about relocation and mudslides. Water samples recorded physical
            conditions. Listening revealed how changes in the river entered people’s lives.
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
            I learned to let evidence revise a plan. What surprised me was how quickly a careful map
            or questionnaire became incomplete on the riverbank. I began with questions about
            water’s physical changes; listening made people’s relationships with the river part of
            the inquiry.
          </p>
          <p>
            My open question remains: how far can physics and computation take us beyond our
            observations, and where do we need to measure or listen again?
          </p>
          <Link className={styles.textLink} href="/impact">
            Bringing these questions to the public <ActionArrow />
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
