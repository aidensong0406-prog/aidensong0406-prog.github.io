import { Link } from "next-view-transitions";
import { ActionArrow } from "./ActionArrow";
import { YangtzeMap } from "./YangtzeMap";
import styles from "./YangtzeProject.module.css";

export function YangtzeProject() {
  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <Link href="/research" className={styles.backLink}>
        <ActionArrow direction="left" /> Research
      </Link>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Fieldwork · June–July 2026</p>
          <h1>Yangtze River Expedition</h1>
          <p className={styles.intro}>
            A river I grew up beside, seen again through water samples and the people who call it
            home.
          </p>
        </div>
        <div className={styles.headingNote}>
          <span>From mountain water</span>
          <span>to the middle Yangtze</span>
        </div>
      </header>

      <YangtzeMap />

      <dl className={styles.facts} aria-label="Expedition in numbers">
        <div>
          <dt>Cities visited</dt>
          <dd>10+</dd>
        </div>
        <div>
          <dt>Water samples</dt>
          <dd>30+</dd>
        </div>
        <div>
          <dt>Conversations</dt>
          <dd>50+</dd>
        </div>
      </dl>

      <section className={styles.investigation} aria-labelledby="investigation-title">
        <div className={styles.sectionIntro}>
          <h2 id="investigation-title">Two Ways of Reading a River</h2>
          <p>
            I brought questions from fluid modeling into a landscape shaped by both water and
            people.
          </p>
        </div>
        <div className={styles.questions}>
          <article>
            <span className={styles.chapter}>01 / Physical evidence</span>
            <h3>What changes when waters meet?</h3>
            <p>
              Confluences and upstream–downstream stops gave the investigation its structure: how
              temperature, mixing, and human intervention shape a river.
            </p>
          </article>
          <article>
            <span className={styles.chapter}>02 / Local experience</span>
            <h3>What does a changing river mean to people?</h3>
            <p>
              Conversations with residents and boat operators opened questions about livelihoods,
              relocation, and the places people remain attached to.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.reflection} aria-labelledby="reflection-title">
        <div>
          <p className={styles.eyebrow}>Reflection</p>
          <h2 id="reflection-title">The Map Was Only a Beginning</h2>
        </div>
        <div className={styles.reflectionCopy}>
          <p>
            A planned sampling point became a cliff or an overgrown path. A conversation with a boat
            operator moved beyond my printed questionnaire. Both changed how I worked: I had to
            adapt the plan and listen for questions I had not prepared.
          </p>
          <details>
            <summary>
              Read the field notes <ActionArrow direction="down" />
            </summary>
            <div>
              <h3>Reaching the water</h3>
              <p>
                In the mountains, at around 3,000 meters, I searched for access to the river. A
                staircase and a muddy path finally led to the water and the sampling bottle I had
                labeled weeks earlier.
              </p>
              <h3>Leaving the questionnaire</h3>
              <p>
                People spoke about tourism, fears of relocation, and concerns about mudslides. Their
                willingness to keep talking showed me how inseparable the river was from their
                lives, much as it had been from my own childhood.
              </p>
            </div>
          </details>
          <p className={styles.openQuestion}>
            How can physical evidence and local accounts inform one another, while preserving what
            each can tell us?
          </p>
        </div>
      </section>

      <nav className={styles.continuations} aria-label="Continue exploring">
        <Link href="/work/density-driven-flows">
          <div>
            <h2>PINN-LOCK</h2>
            <p>The fluid-modeling questions I brought to the river.</p>
          </div>
          <ActionArrow />
        </Link>
        <Link href="/work/shishijie">
          <div>
            <h2>Shishijie</h2>
            <p>The family stone collection where my connection began.</p>
          </div>
          <ActionArrow />
        </Link>
      </nav>
    </main>
  );
}
