import { Link } from "next-view-transitions";
import { createPageMetadata } from "@/utils/metadata";
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
  const chapters = [
    {
      title: "Research",
      href: "/research",
      image: "density-driven-flows",
      description: "Ocean modeling, experiments, and Yangtze fieldwork.",
    },
    {
      title: "Impact",
      href: "/impact",
      image: "glacier-week",
      description: "Science exhibitions and a family stone museum.",
    },
    {
      title: "Community",
      href: "/community",
      image: "crescent-philharmonic",
      description: "Orchestra leadership, mathematical modeling, and shared code.",
    },
  ];
  return (
    <main id="main-content" className="portfolio-shell home-portfolio">
      <header className={`intro-panel ${styles.intro}`}>
        <div className="intro-copy">
          <h1>Aiden Song</h1>
          <p className={styles.brand}>
            Computing the Ocean,
            <br />
            Connecting Science to People.
          </p>
          <p>
            I’m a student at Shanghai High School International Division, using physics and AI to
            study a changing ocean and share science beyond the laboratory.
          </p>
          <div className="profile-actions">
            <Link className="site-button primary" href="/research">
              Research <ActionArrow />
            </Link>
            <a className="site-button" href="/AidenSongResume0831.pdf">
              Résumé <ActionArrow />
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

      <nav className={styles.gateways} aria-label="Research, impact, and community">
        {chapters.map((chapter) => (
          <Link href={chapter.href} className={styles.gateway} key={chapter.href}>
            <div className={styles.gatewayArtwork}>
              <ProjectArtwork
                visual={null}
                media={getProject(chapter.image).cover}
                sizes="(max-width: 700px) 94vw, 360px"
              />
            </div>
            <div className={styles.gatewayCopy}>
              <h2>
                {chapter.title}
                <ActionArrow />
              </h2>
              <p>{chapter.description}</p>
            </div>
          </Link>
        ))}
      </nav>

      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
        <a className="action-inline" href={`mailto:${person.email}`}>
          {person.email}
          <ActionArrow direction="external" />
        </a>
      </section>
    </main>
  );
}
