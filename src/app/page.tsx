import { Link } from "next-view-transitions";
import { createPageMetadata } from "@/utils/metadata";
import { FiAward, FiBookOpen } from "react-icons/fi";
import { ActionArrow } from "@/components/ActionArrow";
import { home, person } from "@/resources";
import { getProject } from "@/resources/portfolio";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import styles from "./home.module.css";

export async function generateMetadata() {
  return createPageMetadata({
    title: home.title,
    description: home.description,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const featured = getProject("glacier-week");
  const supporting = ["shishijie", "crescent-philharmonic", "alphadeer"].map(getProject);
  const research = ["density-driven-flows", "computational-oceanography"].map(getProject);
  return (
    <main id="main-content" className="portfolio-shell home-portfolio">
      <header className="intro-panel">
        <div className="intro-copy">
          <h1>Aiden Song</h1>
          <p>
            I'm a student at Shanghai High School International Division, exploring oceanography,
            machine learning, and science education.
          </p>
          <div className="profile-actions">
            <a className="site-button primary" href="#experiences">
              Experiences
              <ActionArrow direction="down" />
            </a>
            <a className="site-button" href="/AidenSongResume0831.pdf">
              Résumé
              <ActionArrow />
            </a>
          </div>
        </div>
        <div
          className={styles.portraitPlaceholder}
          role="img"
          aria-label="Portrait placeholder for Aiden Song"
        >
          <span className={styles.portraitInitials} aria-hidden="true">
            AS
          </span>
          <span className={styles.portraitLabel} aria-hidden="true">
            Portrait forthcoming
          </span>
        </div>
      </header>

      <section id="experiences" className="portfolio-section" aria-labelledby="experiences-title">
        <div className="section-heading">
          <h2 id="experiences-title">Experiences</h2>
          <Link className="site-button compact" href="/work">
            View all
            <ActionArrow />
          </Link>
        </div>
        <Link href={`/work/${featured.slug}`} className={styles.featured}>
          <div className={styles.featuredArt}>
            <ProjectArtwork visual={featured.visual} media={featured.cover} priority />
          </div>
          <div className={styles.featuredCopy}>
            <h3>{featured.title}</h3>
            <p>A four-day climate exhibition welcoming 84+ classes.</p>
            <span className={`site-button compact ${styles.explore}`}>
              View experience <ActionArrow />
            </span>
          </div>
        </Link>
        <div className={styles.supporting}>
          {supporting.map((project) => (
            <Link className={styles.supportCard} key={project.slug} href={`/work/${project.slug}`}>
              <div className={styles.supportArt}>
                <ProjectArtwork visual={project.visual} media={project.cover} />
              </div>
              <div className={styles.supportCopy}>
                <h3 className="action-heading">
                  {project.title}
                  <ActionArrow />
                </h3>
                <p>{project.status ?? project.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="research" className="portfolio-section" aria-labelledby="research-title">
        <div className="section-heading">
          <h2 id="research-title">Research</h2>
          <Link className="site-button compact" href="/work#Research">
            View all
            <ActionArrow />
          </Link>
        </div>
        <div className={styles.researchGrid}>
          {research.map((project) => (
            <Link
              className={`${styles.researchCard} ${!project.cover && !project.visual ? styles.researchTextCard : ""}`}
              key={project.slug}
              href={`/work/${project.slug}`}
            >
              {(project.cover || project.visual) && (
                <div className={styles.researchArt}>
                  <ProjectArtwork visual={project.visual} media={project.cover} />
                </div>
              )}
              <div className={styles.researchCopy}>
                <h3 className="action-heading">
                  {project.title}
                  <ActionArrow />
                </h3>
                <p>{project.tags[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className={styles.profileLinks}>
        <Link href="/about#education" className={styles.profileLink}>
          <FiBookOpen aria-hidden="true" />
          <div>
            <h2>Education</h2>
          </div>
          <ActionArrow />
        </Link>
        <Link href="/honors" className={styles.profileLink}>
          <FiAward aria-hidden="true" />
          <div>
            <h2>Honors</h2>
          </div>
          <ActionArrow />
        </Link>
      </div>
      <section id="contact" className="contact-panel">
        <h2>Contact</h2>
        <a className="action-inline" href={`mailto:${person.email}`}>
          {person.email}
          <ActionArrow direction="external" />
        </a>
      </section>
    </main>
  );
}
