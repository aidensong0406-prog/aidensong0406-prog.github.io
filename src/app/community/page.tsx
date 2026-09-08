import { Link } from "next-view-transitions";
import { Column } from "@once-ui-system/core";
import { ActionArrow } from "@/components/ActionArrow";
import { createPageMetadata } from "@/utils/metadata";
import styles from "./community.module.css";

export const metadata = createPageMetadata({
  title: "Community — Aiden Song",
  description:
    "Why I founded Crescent Philharmonic, learned to listen after the bow, and built modeling notebooks that students could make their own.",
  path: "/community",
});

export default function Community() {
  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <header className={styles.heading}>
        <h1>Community</h1>
        <p>
          In an orchestra and a modeling classroom, I am learning to build a shared starting point
          and leave room for other people to shape what happens next.
        </p>
      </header>

      <section id="music" className={styles.music} aria-labelledby="orchestra-title">
        <Column className={styles.founding}>
          <header className={styles.storyHeading}>
            <h2 id="orchestra-title">Crescent Philharmonic</h2>
            <p>Leadership through music</p>
          </header>
          <p>
            The crescendo in Gershwin’s <em>Rhapsody in Blue</em> brings strings and winds together.
            At my school, those musicians trained in separate programs. In tenth grade, I founded
            Crescent Philharmonic to make music like this possible.
          </p>
          <p>
            Early rehearsals exposed our different training habits. We had joined one orchestra, but
            did not yet share a musical language. With help from the music department, we learned to
            play as an ensemble and take on repertoire the separate programs could not perform
            alone.
          </p>
          <p>
            Founding the group was only a beginning. Bringing the musicians together meant returning
            to that work in every rehearsal.
          </p>
        </Column>

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
          <Link className={styles.textLink} href="/work/crescent-philharmonic">
            Concert photographs and details <ActionArrow />
          </Link>
        </figure>

        <section className={styles.reflection} aria-labelledby="listening-title">
          <h3 id="listening-title">Reflection</h3>
          <Column className={styles.prose}>
            <p>
              After a clarinet performance at a hospital, an elderly listener struggled to tell me,
              “A concerto. This is a concerto.” I bowed and left. Only on the ride home did I
              recognize my mistake: I had entered expecting sadness, while he wanted to tell me what
              he heard in the music.
            </p>
            <p>
              I began staying after the bow, listening to questions and taking requests. When
              someone asked for <em>Howl’s Moving Castle</em>, I practiced it and brought it on our
              next visit. I could not resolve the uncertainty of a hospital stay, but I could leave
              time for a conversation whose subject was music.
            </p>
          </Column>
        </section>
      </section>

      <section id="modeling" className={styles.modeling} aria-labelledby="modeling-title">
        <h2 id="modeling-title">Mathematical Modeling Club</h2>
        <Column className={styles.prose}>
          <p>
            In our community of more than 100 students, I noticed two familiar obstacles: a blank
            screen, or a finished solution to imitate. I designed starter notebooks that supplied
            enough code to begin while leaving assumptions and modeling decisions open.
          </p>
          <p>
            I connected members whose approaches could help each other, shared their functions, and
            incorporated their code into later notebooks. Members began searching earlier work and
            building on it. Our notebooks became a shared memory, with each student’s contribution
            available for someone else to extend.
          </p>
          <p>
            I carry this practice onto Kaggle, where my public notebooks have received more than 600
            upvotes and 400 forks. Seeing an idea become another person’s starting point has changed
            what I value in teaching: giving people enough direction to begin, and enough freedom to
            make the work their own.
          </p>
          <Link className={styles.textLink} href="/work/mathematical-modeling-club">
            Club activities and training <ActionArrow />
          </Link>
        </Column>
      </section>
    </main>
  );
}
