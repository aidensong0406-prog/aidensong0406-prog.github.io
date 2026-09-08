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
      description:
        "From a homemade tank to ocean forecasting and Yangtze fieldwork: investigating what we can learn about moving water.",
    },
    {
      title: "Impact",
      href: "/impact",
      image: "glacier-week",
      description:
        "Exhibitions and a family stone museum invite people to engage with science through food, play, and close observation.",
    },
    {
      title: "Community",
      href: "/community",
      image: "crescent-philharmonic",
      description:
        "Bringing strings and winds together, listening after performances, and building modeling notebooks that students can make their own.",
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
            I am a student at Shanghai High School International Division exploring how
            computational science and artificial intelligence can help us understand a changing
            ocean — and how science can become more accessible beyond the laboratory.
          </p>
          <p className={styles.scope}>
            My work spans computational oceanography, climate research, mathematical modeling, and
            science education.
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
