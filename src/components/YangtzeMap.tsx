"use client";

import { useId, useRef, useState } from "react";
import { expeditionRegions, expeditionStops } from "@/resources/yangtze-expedition";
import { ActionArrow } from "./ActionArrow";
import { YangtzeWebMap } from "./YangtzeWebMap";
import styles from "./YangtzeMap.module.css";

export function YangtzeMap() {
  const id = useId().replace(/:/g, "");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const journalRef = useRef<HTMLDivElement>(null);
  const activeStop = expeditionStops.find((stop) => stop.id === selectedId);
  const activeRegion = expeditionRegions.find((region) => region.id === activeStop?.regionId);
  const activeIndex = expeditionStops.findIndex((stop) => stop.id === selectedId);

  function selectStop(stopId: string) {
    const fromJournal = journalRef.current?.contains(document.activeElement);
    const nextRegion = expeditionStops.find((stop) => stop.id === stopId)?.regionId;
    setSelectedId(stopId);
    if (fromJournal && nextRegion !== activeRegion?.id) {
      requestAnimationFrame(() => journalRef.current?.focus({ preventScroll: true }));
    }
  }

  function overview() {
    setSelectedId(null);
    requestAnimationFrame(() => journalRef.current?.focus({ preventScroll: true }));
  }

  return (
    <section className={styles.atlas} aria-labelledby={`${id}-title`}>
      <div className={styles.atlasHeader}>
        <div>
          <h2 id={`${id}-title`}>Along the Yangtze</h2>
          <p>Six regions. Sixteen places along the way.</p>
        </div>
        <span className={styles.atlasSubtitle}>An interactive field atlas</span>
      </div>
      <div className={styles.atlasBody}>
        <YangtzeWebMap
          activeRegionId={activeRegion?.id ?? null}
          detailsId={`${id}-details`}
          onSelectRegion={(regionId) => {
            const region = expeditionRegions.find((item) => item.id === regionId);
            if (region) selectStop(region.stops[0].id);
          }}
        />
        <div
          className={styles.journal}
          id={`${id}-details`}
          ref={journalRef}
          tabIndex={-1}
          aria-label={activeRegion ? `${activeRegion.name} expedition stops` : "Expedition regions"}
        >
          {activeRegion && activeStop ? (
            <>
              <button type="button" className={styles.overviewButton} onClick={overview}>
                <ActionArrow direction="left" /> All regions
              </button>
              <div className={styles.regionHeading}>
                <span className={styles.kicker}>{activeRegion.theme}</span>
                <h3>
                  {activeRegion.name} <span lang="zh">{activeRegion.chinese}</span>
                </h3>
                <p>{activeRegion.description}</p>
              </div>
              <ol
                className={styles.stopList}
                aria-label={`${activeRegion.name} stops in travel order`}
              >
                {activeRegion.stops.map((stop) => {
                  const number = expeditionStops.findIndex((item) => item.id === stop.id) + 1;
                  return (
                    <li key={stop.id}>
                      <button
                        type="button"
                        aria-pressed={activeStop.id === stop.id}
                        onClick={() => selectStop(stop.id)}
                        aria-controls={`${id}-stop-note`}
                      >
                        <span className={styles.stopNumber}>{String(number).padStart(2, "0")}</span>
                        <span>
                          <strong>{stop.english}</strong>
                          <span lang="zh">{stop.name}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <div
                className={styles.stopNote}
                id={`${id}-stop-note`}
                aria-live="polite"
                aria-atomic="true"
              >
                <span className={styles.kicker}>Location context</span>
                <p>{activeStop.focus}</p>
              </div>
              <div className={styles.stopNavigation}>
                <span>
                  {String(activeIndex + 1).padStart(2, "0")} <span>/ 16 places</span>
                </span>
                <div>
                  <button
                    type="button"
                    aria-label="Previous stop"
                    disabled={activeIndex <= 0}
                    onClick={() => selectStop(expeditionStops[activeIndex - 1].id)}
                  >
                    <ActionArrow direction="left" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next stop"
                    disabled={activeIndex >= expeditionStops.length - 1}
                    onClick={() => selectStop(expeditionStops[activeIndex + 1].id)}
                  >
                    <ActionArrow />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.regionHeading}>
                <span className={styles.kicker}>The journey</span>
                <h3>Follow the River</h3>
                <p>Explore the places in travel order.</p>
              </div>
              <ol className={styles.regionList}>
                {expeditionRegions.map((region, index) => (
                  <li key={region.id}>
                    <button type="button" onClick={() => selectStop(region.stops[0].id)}>
                      <span className={styles.stopNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <strong>{region.name}</strong>
                        <span>{region.theme}</span>
                      </span>
                      <ActionArrow />
                    </button>
                  </li>
                ))}
              </ol>
              <p className={styles.journalFootnote}>
                Water, terrain, and the lives alongside them.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
