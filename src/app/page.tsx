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
  const gateways = [
    {
      title: "Climate",
      href: "/climate",
      project: getProject("glacier-week"),
      description: "Coastal forecasting, Yangtze fieldwork, and climate education.",
    },
    {
      title: "Music",
      href: "/music",
      project: getProject("crescent-philharmonic"),
      description: "Orchestra leadership, school concerts, and community performances.",
    },
    {
      title: "Projects",
      href: "/projects",
      project: getProject("shishijie"),
      description: "Physics-informed AI, Alphadeer, and Shishijie's online rock museum.",
    },
  ];
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
            <Link className="site-button primary" href="/about">
              About
              <ActionArrow />
            </Link>
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

      <nav className={styles.gateways} aria-label="Explore my work">
        {gateways.map((gateway, index) => (
          <Link
            href={gateway.href}
            className={`${styles.gateway} ${index === 0 ? styles.featuredGateway : ""}`}
            key={gateway.href}
          >
            <div className={styles.gatewayArtwork}>
              <ProjectArtwork
                visual={null}
                media={gateway.project.cover}
                priority={index === 0}
                sizes="(max-width: 700px) 94vw, 560px"
              />
            </div>
            <div className={styles.gatewayCopy}>
              <h2>
                {gateway.title}
                <ActionArrow />
              </h2>
              <p>{gateway.description}</p>
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
