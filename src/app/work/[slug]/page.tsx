import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/utils/metadata";
import { projects, type Project } from "@/resources/portfolio";
import { getProjectSection } from "@/resources/site-sections";
import { ProjectArtwork } from "@/components/ProjectArtwork";
import { ProjectGallery } from "@/components/ProjectGallery";
import { FrozenVoices } from "@/components/FrozenVoices";
import {
  FiBookOpen,
  FiFileText,
  FiMic,
  FiBarChart2,
  FiDroplet,
  FiCoffee,
  FiHelpCircle,
  FiMusic,
  FiHeart,
  FiUsers,
  FiGitBranch,
  FiCode,
  FiMessageCircle,
} from "react-icons/fi";
import styles from "./project.module.css";
import { ActionArrow } from "@/components/ActionArrow";

// These highlights condense the existing résumé-derived project descriptions.
// Use qualitative outputs where the résumé provides no numerical results.
const highlights: Record<string, { value: string; label: string }[]> = {
  "density-driven-flows": [
    { value: "Global Top 10", label: "S.T. Yau Science Award" },
    { value: "Top 9", label: "Sichuan Science Fair" },
    { value: "Top 33 / 1,300+", label: "National Top Talent Program" },
  ],
  shishijie: [
    { value: "200+ stones", label: "Family collection" },
    { value: "Interactive 3D", label: "Rotatable museum exhibits" },
    { value: "Contribution design", label: "Device-local draft workflow" },
  ],
  "glacier-week": [
    { value: "84+ classes", label: "Across three school sites" },
    { value: "10,000+ viewers", label: "Frozen Voices educational videos" },
    { value: "Global 1st", label: "Sea Beyond Glaciers category, €5,000 sponsorship" },
  ],
  "computational-oceanography": [
    { value: "MeshGraphNets", label: "Ocean forecasting models" },
    { value: "GPU training", label: "Controlled experiments" },
    { value: "Research manuscript", label: "Figures and scientific writing" },
  ],
  "yangtze-expedition": [
    { value: "50+ interviews", label: "Residents, workers, and stakeholders" },
    { value: "Water sampling", label: "Collection and analysis" },
    { value: "Yangtze River", label: "Headwaters toward downstream regions" },
  ],
  alphadeer: [
    { value: "30+ members", label: "Student-led education team" },
    { value: "80-page translation", label: "UNESCO student AI framework" },
    { value: "10+ seminars", label: "Speakers secured by the team" },
  ],
  "crescent-philharmonic": [
    { value: "100+ members", label: "The school's first full orchestra" },
    { value: "100+ hours", label: "Collective service hours" },
    { value: "500+ audience", label: "Orchestra concert" },
  ],
  "mathematical-modeling-club": [
    { value: "100+ members", label: "Student modeling community" },
    { value: "Weekly training", label: "Models, starter code, and strategy" },
    { value: "Competition honors", label: "Outstanding, Finalist, and Meritorious" },
  ],
};

const deliverableIcons = {
  translation: FiBookOpen,
  research: FiFileText,
  seminar: FiMic,
  infographic: FiBarChart2,
  ice: FiDroplet,
  food: FiCoffee,
  quiz: FiHelpCircle,
  orchestra: FiMusic,
  service: FiHeart,
  concert: FiUsers,
  model: FiGitBranch,
  code: FiCode,
  mentor: FiMessageCircle,
};

function ProjectDeliverables({
  deliverables,
}: { deliverables: NonNullable<Project["deliverables"]> }) {
  const List = deliverables.layout === "sequence" ? "ol" : "ul";
  return (
    <section className={styles.deliverablePanel} aria-labelledby="deliverables-title">
      <h2 id="deliverables-title">{deliverables.title}</h2>
      <List className={`${styles.deliverables} ${styles[deliverables.layout]}`}>
        {deliverables.items.map((item, index) => {
          const Icon = deliverableIcons[item.icon];
          return (
            <li key={item.title}>
              <span className={styles.deliverableIcon} aria-hidden="true">
                {deliverables.layout === "sequence" ? index + 1 : <Icon />}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </li>
          );
        })}
      </List>
    </section>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) return {};
  return createPageMetadata({
    title: `${project.title} — Aiden Song`,
    description: project.summary,
    path: `/work/${slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  const parentSection = getProjectSection(slug);
  if (!project || !parentSection) notFound();

  const related = projects
    .filter(
      (other) => other.slug !== slug && getProjectSection(other.slug)?.path === parentSection.path,
    )
    .slice(0, 2);

  return (
    <main id="main-content" className={`portfolio-shell ${styles.page}`}>
      <Link className={`site-button compact ${styles.backLink}`} href={parentSection.path}>
        <ActionArrow direction="left" />
        {parentSection.label}
      </Link>

      <header
        className={`${styles.hero} ${project.gallery || (!project.cover && !project.visual && !project.deliverables) ? styles.galleryHero : ""}`}
      >
        <div className={styles.heroCopy}>
          <p className={styles.category}>{parentSection.label}</p>
          {project.status && <p className={styles.status}>{project.status}</p>}
          <h1>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <dl className={styles.metadata}>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{project.period}</dd>
            </div>
          </dl>
        </div>
        {!project.gallery && project.cover ? (
          <figure className={styles.visual}>
            <div className={styles.heroArtwork}>
              <ProjectArtwork visual={project.visual} media={project.cover} priority />
            </div>
          </figure>
        ) : !project.gallery && project.deliverables ? (
          <ProjectDeliverables deliverables={project.deliverables} />
        ) : !project.gallery && project.visual ? (
          <figure className={styles.visual}>
            <div className={styles.heroArtwork}>
              <ProjectArtwork visual={project.visual} />
            </div>
          </figure>
        ) : null}
      </header>

      {project.gallery && <ProjectGallery images={project.gallery} title={project.title} />}
      {slug === "glacier-week" && <FrozenVoices />}

      {!project.gallery && !project.status && !project.deliverables && (
        <section className={styles.highlights} aria-label="Project highlights">
          {highlights[slug].map((item) => (
            <div key={item.label} className={styles.highlight}>
              <p className={styles.highlightValue}>{item.value}</p>
              <p>{item.label}</p>
            </div>
          ))}
        </section>
      )}

      <article className={styles.story} aria-label={`${project.title} details`}>
        {project.sections.map((section, index) => (
          <section
            className={styles.storySection}
            key={section.title}
            id={`section-${index + 1}`}
            aria-labelledby={`heading-${index + 1}`}
          >
            <h2 id={`heading-${index + 1}`}>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </article>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <div className={styles.relatedHeading}>
            <h2 id="related-title">Related Work</h2>
            <Link className={`site-button compact ${styles.allLink}`} href={parentSection.path}>
              View all
              <ActionArrow />
            </Link>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((other) => (
              <Link className={styles.relatedLink} key={other.slug} href={`/work/${other.slug}`}>
                {(other.cover || other.visual) && (
                  <div className={styles.relatedArtwork}>
                    <ProjectArtwork visual={other.visual} media={other.cover} />
                  </div>
                )}
                <div className={styles.relatedCopy}>
                  <h3>{other.title}</h3>
                  <p>{parentSection.label}</p>
                </div>
                <ActionArrow />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
