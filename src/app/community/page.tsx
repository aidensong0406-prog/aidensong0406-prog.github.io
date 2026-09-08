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
          I lead an orchestra and a mathematical modeling club, and share my work through
          open-source notebooks. Each has taught me how to make room for other people’s
          contributions.
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
              <h3>Founding the Orchestra</h3>
              <p>
                The crescendo in Gershwin’s <em>Rhapsody in Blue</em> brings strings and winds
                together. At my school, those musicians trained in separate programs. In tenth
                grade, I founded Crescent Philharmonic to make music like this possible.
              </p>
              <p>
                Early rehearsals exposed our different training habits. With help from the music
                department, we learned to share a musical language and perform repertoire the
                separate programs could not take on alone.
              </p>
            </div>
          </div>

          <section className={styles.reflection} aria-labelledby="listening-title">
            <h3 id="listening-title">Reflection</h3>
            <div className={styles.prose}>
              <p>
                After a clarinet performance at a hospital, an elderly listener struggled to tell
                me, “A concerto. This is a concerto.” I bowed and left. Only on the ride home did I
                recognize my mistake: I had entered expecting sadness, while he wanted to tell me
                what he heard in the music.
              </p>
              <p>
                I began staying after the bow, listening to questions and taking requests. When
                someone asked for <em>Howl’s Moving Castle</em>, I practiced it and brought it on
                our next visit. I could not resolve the uncertainty of a hospital stay, but I could
                leave time for a conversation whose subject was music.
              </p>
            </div>
          </section>
          <Link className={styles.projectLink} href="/work/crescent-philharmonic">
            Explore Crescent Philharmonic <ActionArrow />
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
          <div className={styles.modelingBody}>
            <div className={styles.prose}>
              <h3>A Place to Start</h3>
              <p>
                In our community of more than 100 students, I noticed two familiar obstacles: a
                blank screen, or a finished solution to imitate. I designed starter notebooks that
                supplied enough code to begin while leaving assumptions and modeling decisions open.
              </p>
            </div>
            <div className={styles.prose}>
              <h3>Building Shared Knowledge</h3>
              <p>
                I connected members whose approaches could help each other, shared their functions,
                and incorporated their code into later notebooks. Members began building on earlier
                work. Our notebooks became a shared memory, with each student’s contribution
                available for someone else to extend.
              </p>
            </div>
          </div>
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
          <div className={styles.openSourceBody}>
            <p>
              I share reproducible notebooks, solution explanations, and reusable code on Kaggle. My
              public notebooks have received more than 600 upvotes and 400 forks. Seeing an idea
              become someone else’s starting point has changed what I value in sharing my work:
              leaving room for others to adapt it and take it further.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
