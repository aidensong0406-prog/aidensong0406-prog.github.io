"use client";

import { person } from "@/resources/content";
import { education, getProject } from "@/resources/portfolio";
import { transitionProfile } from "@/utils/viewTransitions";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { FiBookOpen, FiCode, FiMapPin, FiMusic } from "react-icons/fi";
import styles from "./AboutProfile.module.css";
import { ActionArrow } from "./ActionArrow";
import { HonorsPanel } from "./HonorsPanel";
import { ProjectArtwork } from "./ProjectArtwork";

const sections = [
  { key: "overview", label: "Overview", hash: "background" },
  { key: "education", label: "Education", hash: "education" },
  { key: "honors", label: "Honors", hash: "recognition" },
  { key: "interests", label: "Interests", hash: "outside" },
] as const;
type Section = (typeof sections)[number]["key"];
const educationMarks = ["shsid-footer.png", "cmu.ico", "stanford.png"];

function sectionFromHash(): Section {
  const hash = window.location.hash.slice(1);
  return sections.find((s) => s.hash === hash || s.key === hash)?.key ?? "overview";
}

function BadmintonGraphic() {
  return (
    <svg viewBox="0 0 380 160" fill="none" aria-hidden="true">
      <g transform="translate(170 66) rotate(30)">
        <ellipse rx="36" ry="49" stroke="currentColor" strokeWidth="3" />
        <path d="M0 49V91" stroke="currentColor" strokeWidth="5" />
        {[-20, -10, 0, 10, 20].map((x) => (
          <path key={x} d={`M${x} -36V36`} stroke="currentColor" opacity=".35" />
        ))}
        {[-30, -15, 0, 15, 30].map((y) => (
          <path key={y} d={`M-27 ${y}H27`} stroke="currentColor" opacity=".35" />
        ))}
      </g>
      <path d="M252 45L271 33L288 61L266 69Z" fill="currentColor" opacity=".24" />
      <path d="M252 45L266 69M261 39L273 66M271 33L280 64" stroke="currentColor" />
      <path d="M266 69Q280 83 288 61" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function AboutProfile() {
  const [active, setActive] = useState<Section>("overview");
  const [honorYear, setHonorYear] = useState("All");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      if (hash === "#research") {
        window.location.replace("/climate/#research-fieldwork");
        return;
      }
      if (hash === "#community" || hash === "#leadership") {
        window.location.replace("/projects/");
        return;
      }
      setActive(sectionFromHash());
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  useEffect(() => {
    const tab = tabRefs.current[sections.findIndex((section) => section.key === active)];
    const track = tab?.parentElement;
    if (!tab || !track) return;
    const itemBounds = tab.getBoundingClientRect();
    const trackBounds = track.getBoundingClientRect();
    if (itemBounds.left < trackBounds.left || itemBounds.right > trackBounds.right) {
      track.scrollTo({
        left:
          track.scrollLeft +
          itemBounds.left -
          trackBounds.left -
          (track.clientWidth - tab.clientWidth) / 2,
      });
    }
  }, [active]);

  function select(key: Section, focus = false) {
    if (key === active) return;
    const index = sections.findIndex((s) => s.key === key);
    const hash = `#${sections[index].hash}`;
    transitionProfile(() => {
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      setActive(key);
      if (focus) tabRefs.current[index]?.focus();
    });
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % sections.length;
    else if (event.key === "ArrowLeft") next = (index + sections.length - 1) % sections.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sections.length - 1;
    else return;
    event.preventDefault();
    select(sections[next].key, true);
  }

  return (
    <div className={styles.profileLayout}>
      <aside className={styles.identity} aria-label="Personal profile">
        <div className={styles.identityArt}>
          <ProjectArtwork visual="river" />
          <div className={styles.identityMonogram} aria-hidden="true">
            AS
          </div>
        </div>
        <div className={styles.identityCopy}>
          <h2>Aiden Song</h2>
          <p>Student at SHSID. Research, music, and science education.</p>
          <div className={styles.identityFacts}>
            <p>
              <FiMapPin aria-hidden="true" />
              Shanghai, China
            </p>
            <p>
              <FiBookOpen aria-hidden="true" />
              Class of 2028
            </p>
          </div>
          <div className={styles.identityActions}>
            <a
              className={`site-button compact ${styles.emailLink}`}
              href={`mailto:${person.email}`}
            >
              Email
              <ActionArrow direction="external" />
            </a>
            <a
              className={`site-button compact ${styles.emailLink}`}
              href="/AidenSongResume0831.pdf"
            >
              Résumé
              <ActionArrow />
            </a>
          </div>
        </div>
      </aside>

      <div className={styles.workspace}>
        <noscript>
          <p>
            Read the complete profile in the{" "}
            <a className="text-link" href="/AidenSongResume0831.pdf">
              résumé
            </a>
            .
          </p>
        </noscript>
        <div className={styles.tabs} data-js-only role="tablist" aria-label="Profile sections">
          {sections.map((section, index) => (
            <button
              key={section.key}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`profile-tab-${section.key}`}
              aria-controls={`profile-panel-${section.key}`}
              aria-selected={active === section.key}
              tabIndex={active === section.key ? 0 : -1}
              onClick={() => select(section.key)}
              onKeyDown={(event) => onTabKey(event, index)}
            >
              {section.label}
            </button>
          ))}
        </div>
        <section
          key={active}
          className={`${styles.panel} profile-panel`}
          id={`profile-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`profile-tab-${active}`}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: ARIA tabpanels need a keyboard focus stop.
          tabIndex={0}
        >
          {active === "overview" && (
            <>
              <h2 className="sr-only">Overview</h2>
              <Link href="/work/shishijie" className={styles.personalFeature}>
                <div className={styles.personalArt}>
                  <ProjectArtwork
                    visual="stone"
                    media={getProject("shishijie").cover}
                    priority
                    sizes="(max-width: 550px) 94vw, 450px"
                  />
                </div>
                <div className={styles.personalCopy}>
                  <h3>Family Collection</h3>
                  <p>
                    My family's 200+ Yangtze stones inspired Shishijie, an interactive online
                    museum.
                  </p>
                  <span>
                    Explore Shishijie <ActionArrow />
                  </span>
                </div>
              </Link>
              <div className={styles.personalStudies}>
                <Link href="/work/density-driven-flows" className={styles.personalStudy}>
                  <div className={styles.personalStudyArt}>
                    <ProjectArtwork
                      visual="flow"
                      media={getProject("density-driven-flows").cover}
                    />
                  </div>
                  <div className={styles.personalCopy}>
                    <h3 className="action-heading">
                      Research
                      <ActionArrow />
                    </h3>
                    <p>Reconstructing fluid flows with physics-informed AI.</p>
                  </div>
                </Link>
                <Link href="/work/crescent-philharmonic" className={styles.personalStudy}>
                  <div className={styles.personalStudyArt}>
                    <ProjectArtwork
                      visual="music"
                      media={getProject("crescent-philharmonic").cover}
                    />
                  </div>
                  <div className={styles.personalCopy}>
                    <h3 className="action-heading">
                      Music
                      <ActionArrow />
                    </h3>
                    <p>Founder of the school's first full orchestra.</p>
                  </div>
                </Link>
              </div>
            </>
          )}

          {active === "education" && (
            <>
              <div className={styles.panelHeading}>
                <h2>Education</h2>
              </div>
              <div className={styles.educationTimeline}>
                {education.map((item, index) => (
                  <article key={item.title} className={styles.educationEntry}>
                    <div
                      className={`${styles.educationMark} ${index === 0 ? styles.schoolMark : ""}`}
                    >
                      <Image
                        src={`/images/education/${educationMarks[index]}`}
                        alt=""
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className={styles.educationDetail}>
                      <h3>{item.title}</h3>
                      <p className={styles.educationDate}>{item.period}</p>
                      {index === 0 ? (
                        <p>{item.subtitle}</p>
                      ) : (
                        <details className={styles.coursework}>
                          <summary>
                            Coursework <ActionArrow direction="down" />
                          </summary>
                          <p>{item.subtitle}</p>
                        </details>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <section className={styles.scoreBand} aria-labelledby="test-scores-title">
                <h3 id="test-scores-title">Test Scores</h3>
                <dl className={styles.testScores}>
                  <div>
                    <dt>SAT</dt>
                    <dd>
                      1550 <span>/ 1600</span>
                    </dd>
                  </div>
                  <div>
                    <dt>TOEFL</dt>
                    <dd>
                      119 <span>/ 120</span>
                    </dd>
                  </div>
                </dl>
              </section>
            </>
          )}

          {active === "honors" && <HonorsPanel year={honorYear} onYearChange={setHonorYear} />}

          {active === "interests" && (
            <>
              <div className={styles.panelHeading}>
                <h2>Interests</h2>
                <FiMusic aria-hidden="true" />
              </div>
              <div className={styles.interestsGrid}>
                <Link className={styles.interestCard} href="/work/shishijie">
                  <div className={styles.interestArt}>
                    <ProjectArtwork visual="stone" media={getProject("shishijie").cover} />
                  </div>
                  <div>
                    <h3 className="action-heading">
                      Shishijie
                      <ActionArrow />
                    </h3>
                    <p>An interactive museum inspired by my family's Yangtze stone collection.</p>
                  </div>
                </Link>
                <Link className={styles.interestCard} href="/work/crescent-philharmonic">
                  <div className={styles.interestArt}>
                    <ProjectArtwork
                      visual="music"
                      media={getProject("crescent-philharmonic").cover}
                    />
                  </div>
                  <div>
                    <h3 className="action-heading">
                      Music
                      <ActionArrow />
                    </h3>
                    <p>Orchestra rehearsals, concerts, and community performances.</p>
                  </div>
                </Link>
                <article className={styles.interestCard}>
                  <div className={`${styles.interestArt} ${styles.academicArt}`}>
                    <BadmintonGraphic />
                  </div>
                  <div>
                    <h3>Badminton</h3>
                    <p>Training and interschool competition with the school varsity team.</p>
                  </div>
                </article>
                <article className={styles.interestCard}>
                  <div className={`${styles.interestArt} ${styles.codeArt}`}>
                    <FiCode aria-hidden="true" />
                  </div>
                  <div>
                    <h3>Kaggle</h3>
                    <p>Machine-learning competitions, shared notebooks, and reusable code.</p>
                    <details className={styles.inlineDetails}>
                      <summary>Competition results</summary>
                      <p>
                        Silver medals in Scientific Forgery Detection, BirdCLEF 2026, and Neurogolf
                        2026.
                      </p>
                    </details>
                  </div>
                </article>
              </div>
            </>
          )}
        </section>
        {sections
          .filter((section) => section.key !== active)
          .map((section) => (
            <section
              key={section.key}
              hidden
              role="tabpanel"
              id={`profile-panel-${section.key}`}
              aria-labelledby={`profile-tab-${section.key}`}
            />
          ))}
      </div>
    </div>
  );
}
