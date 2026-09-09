import { Link } from "next-view-transitions";
import NextLink from "next/link";
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
  const selectedWork = [
    {
      title: "PINN-LOCK",
      section: "Research",
      href: "/work/density-driven-flows",
      image: "density-driven-flows",
      description:
        "Recovering density currents from sparse observations using physics-informed AI.",
      evidence: "Research manuscript available",
    },
    {
      title: "Glacier Week",
      section: "Impact",
      href: "/work/glacier-week",
      image: "glacier-week",
      description:
        "Bringing glacier science into everyday experience through food, melting ice, and play.",
      evidence: "84+ classes across three school sites",
    },
    {
      title: "Crescent Philharmonic",
      section: "Community",
      href: "/work/crescent-philharmonic",
      image: "crescent-philharmonic",
      description:
        "Bringing separate string and wind programs together to perform as one ensemble.",
      evidence: "School performance excerpt, 1:16",
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
            I’m a student at Shanghai High School International Division studying water through
            physics and AI. My curiosity began with the Yangtze stones my family collected.
          </p>
          <div className={styles.actions}>
            <NextLink className="site-button primary" href="#selected-work">
              Explore my work <ActionArrow direction="down" />
            </NextLink>
            <a className={styles.resumeLink} href="/AidenSongResume0831.pdf">
              Résumé <span>(PDF)</span> <ActionArrow />
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

      <section id="selected-work" className={styles.selectedWork} aria-labelledby="selected-title">
        <div className={styles.sectionHeading}>
          <h2 id="selected-title">Selected Work</h2>
          <Link className={styles.aboutLink} href="/about">
            About me <ActionArrow />
          </Link>
        </div>
        <div className={styles.gateways}>
          {selectedWork.map((project) => (
            <Link href={project.href} className={styles.gateway} key={project.href}>
              <div className={styles.gatewayArtwork}>
                <ProjectArtwork
                  visual={null}
                  media={getProject(project.image).cover}
                  sizes="(max-width: 700px) 94vw, 360px"
                />
              </div>
              <div className={styles.gatewayCopy}>
                <p className={styles.sectionLabel}>{project.section}</p>
                <h3>
                  {project.title}
                  <ActionArrow />
                </h3>
                <p>{project.description}</p>
                <p className={styles.evidence}>{project.evidence}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
