import Image from "next/image";
import NextLink from "next/link";
import { Link } from "next-view-transitions";
import { getProject } from "@/resources/portfolio";
import { ActionArrow } from "./ActionArrow";
import { ProjectArtwork } from "./ProjectArtwork";
import styles from "./PinnLockProject.module.css";

const manuscript = "/papers/pinn-lock-research-manuscript.pdf";
const reconstruction = "/images/projects/lock-exchange/reconstruction.png";

export function PinnLockProject() {
  const project = getProject("density-driven-flows");

  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <Link className={styles.backLink} href="/research">
        <ActionArrow direction="left" /> Research
      </Link>

      <header className={styles.heading}>
        <h1>
          PINN-LOCK <span>Reconstructing Density Currents</span>
        </h1>
        <p>How much of a moving fluid can we recover from only a few observations?</p>
        <dl className={styles.metadata}>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>{project.period}</dd>
          </div>
          <div>
            <dt>Mentor</dt>
            <dd>Prof. Yang Bin, ECNU</dd>
          </div>
        </dl>
        <div className={styles.actions}>
          <NextLink className={styles.textLink} href="#results">
            View results <ActionArrow direction="down" />
          </NextLink>
          <a className={styles.textLink} href={manuscript}>
            Research manuscript <span>(PDF)</span> <ActionArrow />
          </a>
        </div>
      </header>

      <section className={styles.experiment} aria-labelledby="experiment-title">
        <div className={styles.copy}>
          <h2 id="experiment-title">The Experiment</h2>
          <p>
            Collecting Yangtze stones made me curious about the water that shaped them. I built a
            lock-exchange tank to watch denser water move beneath lighter water—a large-scale ocean
            process made visible on a table.
          </p>
        </div>
        <figure className={styles.tank}>
          <div className={styles.tankImage}>
            <ProjectArtwork
              visual={null}
              media={project.cover}
              priority
              sizes="(max-width: 760px) 94vw, 550px"
            />
          </div>
          <figcaption>Dyed fluids reveal the density current in a physical tank.</figcaption>
        </figure>
      </section>

      <section className={styles.contribution} aria-labelledby="contribution-title">
        <div className={styles.copy}>
          <h2 id="contribution-title">My Contribution</h2>
          <p>
            I developed a physics-informed neural network to reconstruct velocity, pressure, and
            salinity using equations for motion, mass conservation, and salinity transport. In the
            numerical study below, the observations are sparse samples from a simulation.
          </p>
        </div>
        <dl className={styles.method}>
          <div>
            <dt>Observations</dt>
            <dd>Sparse samples from a simulation</dd>
          </div>
          <div>
            <dt>Physics</dt>
            <dd>Equations constrain the reconstruction</dd>
          </div>
          <div>
            <dt>Reconstruction</dt>
            <dd>Fields beyond the sampled points</dd>
          </div>
        </dl>
      </section>

      <section id="results" className={styles.results} aria-labelledby="results-title">
        <div className={styles.resultIntro}>
          <h2 id="results-title">Reconstruction Results</h2>
          <p>
            In the manuscript’s numerical study, PINN-LOCK used 1.3% of the available SUNTANS
            simulation data. Salinity was recovered more accurately than pressure, which remained
            harder to infer.
          </p>
          <dl className={styles.resultFacts}>
            <div>
              <dt>Simulation data used</dt>
              <dd>1.3%</dd>
            </div>
            <div>
              <dt>Salinity agreement, R²</dt>
              <dd>0.992</dd>
            </div>
            <div>
              <dt>Pressure agreement, R²</dt>
              <dd>0.724</dd>
            </div>
          </dl>
        </div>
        <figure className={styles.resultFigure}>
          <a
            className={styles.figureLink}
            href={reconstruction}
            aria-label="Open the full-size PINN-LOCK reconstruction comparison"
          >
            <Image
              src={reconstruction}
              alt="Six panels show PINN-LOCK predictions above SUNTANS reference fields below. Velocity and salinity patterns agree more closely than pressure."
              width={1480}
              height={786}
              sizes="(max-width: 760px) 94vw, 1100px"
            />
          </a>
          <figcaption>
            <p>
              Predictions above; SUNTANS simulated reference fields below. This figure compares
              velocity magnitude, pressure, and salinity at one time in the numerical study.
            </p>
            <a className={styles.textLink} href={reconstruction}>
              Full-size figure <ActionArrow direction="external" />
            </a>
          </figcaption>
        </figure>
        <details className={styles.measurements}>
          <summary>
            Reported numerical results <ActionArrow direction="down" />
          </summary>
          <div className={styles.tableWrap}>
            <table>
              <caption>
                Manuscript §III-A: reconstruction using 1.3% of the simulated dataset.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Field</th>
                  <th scope="col">R²</th>
                  <th scope="col">Normalized RMSE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Horizontal velocity</th>
                  <td>0.983</td>
                  <td>0.130</td>
                </tr>
                <tr>
                  <th scope="row">Vertical velocity</th>
                  <td>0.925</td>
                  <td>0.274</td>
                </tr>
                <tr>
                  <th scope="row">Pressure</th>
                  <td>0.724</td>
                  <td>0.525</td>
                </tr>
                <tr>
                  <th scope="row">Salinity</th>
                  <td>0.992</td>
                  <td>0.089</td>
                </tr>
              </tbody>
            </table>
            <p>R² closer to 1 indicates stronger agreement; lower RMSE indicates less error.</p>
          </div>
        </details>
        <a className={styles.sourceLink} href={`${manuscript}#page=4`}>
          Source: unpublished manuscript, page 4 <ActionArrow />
        </a>
      </section>

      <section className={styles.limitations} aria-labelledby="limitations-title">
        <h2 id="limitations-title">Limitations and Next Question</h2>
        <div className={styles.copy}>
          <p>
            The current method studies two-dimensional flows with symmetric initial fluid volumes.
            The pressure errors show that recovering visible structure does not make every hidden
            variable equally reliable.
          </p>
          <p>
            How far can physics take us beyond our observations, and where do we need to measure
            again? Forecasting an evolving ocean extends that question to a much larger system.
          </p>
        </div>
      </section>

      <section className={styles.record} aria-labelledby="record-title">
        <div className={styles.recordHeading}>
          <h2 id="record-title">Manuscript and Recognition</h2>
          <a className={styles.textLink} href={manuscript}>
            Unpublished manuscript (PDF) <ActionArrow />
          </a>
        </div>
        <dl className={styles.recognition}>
          <div>
            <dt>S.T. Yau Science Award</dt>
            <dd>Global Top 10</dd>
          </div>
          <div>
            <dt>Sichuan Science Fair</dt>
            <dd>Top 9</dd>
          </div>
          <div>
            <dt>National Top Talent Program</dt>
            <dd>Outstanding Student, Top 33 of 1,300+</dd>
          </div>
        </dl>
      </section>

      <nav className={styles.continuations} aria-label="Continue exploring Aiden’s work">
        <Link className={styles.nextProject} href="/work/computational-oceanography">
          <div>
            <h2>Storm-Surge Prediction</h2>
            <p>From reconstructing flows to forecasting their evolution.</p>
          </div>
          <ActionArrow />
        </Link>
        <Link className={styles.nextProject} href="/work/glacier-week">
          <div>
            <h2>Glacier Week</h2>
            <p>A separate exploration of how people engage with climate science.</p>
          </div>
          <ActionArrow />
        </Link>
      </nav>
    </main>
  );
}
