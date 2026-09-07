import { Link } from "next-view-transitions";
import { getProject } from "@/resources/portfolio";
import { ProjectArtwork } from "./ProjectArtwork";
import { ActionArrow } from "./ActionArrow";
import styles from "./CollectionPages.module.css";

export function CollectionProject({
  slug,
  featured = false,
  showImage = true,
  summary,
}: { slug: string; featured?: boolean; showImage?: boolean; summary?: string }) {
  const project = getProject(slug);
  const hasImage = showImage && project.cover;
  return (
    <Link
      className={`${styles.project} ${featured ? styles.featured : ""} ${hasImage ? styles.withImage : ""}`}
      href={`/work/${slug}`}
    >
      {hasImage && (
        <div className={styles.projectImage}>
          <ProjectArtwork
            visual={null}
            media={project.cover}
            priority={featured}
            sizes={featured ? "(max-width: 700px) 94vw, 600px" : "(max-width: 700px) 100px, 160px"}
          />
        </div>
      )}
      <div className={styles.projectCopy}>
        {project.status && <p className={styles.status}>{project.status}</p>}
        {featured ? <h2>{project.title}</h2> : <h3>{project.title}</h3>}
        <p>{summary ?? project.summary}</p>
        <div className={styles.projectFooter}>
          <span>{project.period}</span>
          <ActionArrow />
        </div>
      </div>
    </Link>
  );
}
