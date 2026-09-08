"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ActionArrow } from "./ActionArrow";
import type { Project } from "@/resources/portfolio";
import styles from "./ProjectGallery.module.css";

export function ProjectGallery({
  images,
  title,
}: { images: NonNullable<Project["gallery"]>; title: string }) {
  const [active, setActive] = useState(0);
  const galleryId = useId();
  const selected = images[active];

  return (
    <section className={styles.gallery} aria-label={`${title} gallery`}>
      <figure className={styles.figure}>
        <div
          className={`${styles.imageFrame} ${selected.kind === "figure" ? styles.scientificFigure : ""} ${selected.kind === "poster" ? styles.posterFrame : ""}`}
          id={`${galleryId}-media`}
          style={{ aspectRatio: selected.ratio ?? "16 / 10" }}
        >
          {selected.video ? (
            // biome-ignore lint/a11y/useMediaCaption: The Glacier Week film has burned-in English subtitles; the orchestra excerpt is instrumental without spoken dialogue.
            <video
              key={selected.video}
              controls
              playsInline
              preload="none"
              poster={selected.src}
              aria-label={selected.alt}
            >
              <source src={selected.video} type="video/mp4" />
              Your browser does not support embedded video.{" "}
              <a href={selected.video}>Open the film</a>.
            </video>
          ) : (
            <Image
              src={selected.src}
              alt={selected.alt}
              fill
              sizes={
                selected.kind === "poster"
                  ? "(max-width: 520px) 94vw, 480px"
                  : "(max-width: 1150px) 94vw, 1100px"
              }
              preload={active === 0}
              fetchPriority={active === 0 ? "high" : undefined}
            />
          )}
        </div>
        <figcaption className={styles.caption}>
          <div aria-live="polite" aria-atomic="true">
            <h2>{selected.title}</h2>
            <p>{selected.caption}</p>
          </div>
          <a
            className="site-button compact"
            href={selected.video ?? selected.src}
            target="_blank"
            rel="noreferrer"
          >
            {selected.video ? "Open video" : "Full-size image"}
            <ActionArrow direction="external" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>
      {images.length > 1 && (
        <fieldset data-js-only className={styles.choices} aria-label="Choose media">
          {images.map((item, index) => (
            <button
              key={item.src}
              type="button"
              aria-pressed={index === active}
              aria-controls={`${galleryId}-media`}
              onClick={() => setActive(index)}
            >
              <span className={styles.thumbnail} aria-hidden="true">
                <Image src={item.src} alt="" fill sizes="(max-width: 700px) 30vw, 120px" />
              </span>
              <span>{item.title}</span>
            </button>
          ))}
        </fieldset>
      )}
    </section>
  );
}
