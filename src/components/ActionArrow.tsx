import styles from "./ActionArrow.module.css";

export function ActionArrow({
  direction = "right",
}: { direction?: "right" | "left" | "down" | "external" }) {
  return (
    <span className={`${styles.arrow} ${styles[direction]}`} aria-hidden="true">
      <span className={styles.motion}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M12.9 3.9 21 12l-8.1 8.1-2.8-2.8 3.3-3.3H3v-4h10.4l-3.3-3.3Z" />
        </svg>
      </span>
    </span>
  );
}
