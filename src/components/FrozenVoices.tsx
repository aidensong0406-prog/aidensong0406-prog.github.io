"use client";

import { useState } from "react";
import Image from "next/image";
import { FiCheck, FiCopy } from "react-icons/fi";
import { ActionArrow } from "./ActionArrow";
import styles from "./FrozenVoices.module.css";

export function FrozenVoices() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyName() {
    try {
      await navigator.clipboard.writeText("FrozenVoices");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <section className={styles.channel} aria-labelledby="frozen-voices-title">
      <Image
        className={styles.identity}
        src="/images/projects/glacier-week/frozen-voices.jpg"
        alt="Frozen Voices glacier emblem"
        width={112}
        height={112}
      />
      <div className={styles.copy}>
        <div className={styles.heading}>
          <h2 id="frozen-voices-title">Frozen Voices</h2>
          <span>WeChat Channels</span>
        </div>
        <p>Glacier science and stories from our exhibition.</p>
        <p className={styles.instructions}>
          In WeChat, open Channels and search for <strong>FrozenVoices</strong>.
        </p>
        <div className={styles.actions}>
          <button className="site-button compact" type="button" onClick={copyName} data-js-only>
            {copyStatus === "copied" ? "Copied" : "Copy account name"}
            {copyStatus === "copied" ? (
              <FiCheck aria-hidden="true" />
            ) : (
              <FiCopy aria-hidden="true" />
            )}
          </button>
          <a
            className="action-inline"
            href="/images/projects/glacier-week/outreach.png"
            target="_blank"
            rel="noreferrer"
          >
            Channel preview <ActionArrow direction="external" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <output className={copyStatus === "failed" ? styles.instructions : "sr-only"}>
          {copyStatus === "copied"
            ? "Account name copied."
            : copyStatus === "failed"
              ? "Copy is unavailable. Search for FrozenVoices in WeChat."
              : ""}
        </output>
      </div>
    </section>
  );
}
