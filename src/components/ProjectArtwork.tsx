import type { Project } from "@/resources/portfolio";
import Image from "next/image";

// Supplied photographs and research outputs take precedence over decorative artwork.
export function ProjectArtwork({
  visual,
  media,
  priority = false,
  sizes = "(max-width: 700px) 100vw, 800px",
}: { visual: Project["visual"]; media?: Project["cover"]; priority?: boolean; sizes?: string }) {
  if (media)
    return (
      <div className="project-art project-media" style={{ background: media.background }}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          style={{ objectFit: media.fit ?? "cover", objectPosition: media.position ?? "center" }}
        />
      </div>
    );
  if (!visual) return null;
  if (visual === "stone")
    return (
      <div className="project-art art-stone" aria-hidden="true">
        <div className="prototype-crop">
          <Image
            src="/images/projects/shishijie/contour-study.png"
            alt=""
            fill
            sizes={sizes}
            preload={priority}
            fetchPriority={priority ? "high" : undefined}
          />
        </div>
      </div>
    );
  return (
    <div className={`project-art art-${visual}`} aria-hidden="true">
      <svg
        aria-hidden="true"
        viewBox="0 0 800 440"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {(visual === "flow" || visual === "river") &&
          Array.from({ length: 24 }, (_, i) => (
            <path
              key={`streamline-${120 + i * 11}`}
              d={
                visual === "flow"
                  ? `M -100 ${120 + i * 11} C 110 ${-20 + i * 8}, 185 ${390 + i * 4}, 365 ${200 + i * 6} S 620 ${50 + i * 10}, 900 ${140 + i * 8}`
                  : `M ${100 + i * 13} -40 C ${780 - i * 11} 100, ${-180 + i * 14} 230, ${510 + i * 12} 480`
              }
              stroke="currentColor"
              strokeWidth={i % 4 === 0 ? 1.8 : 0.65}
              opacity={0.22 + (i % 5) * 0.11}
            />
          ))}
        {visual === "ice" && (
          <>
            <path d="M0 272H800" stroke="currentColor" opacity=".4" />
            <path d="M235 271L311 158L342 181L392 95L448 191L478 164L565 271Z" fill="#a4d7e4" />
            <path d="M235 271L344 356L401 398L481 340L565 271Z" fill="#4696b1" opacity=".38" />
            <path d="M392 95L374 271H235L311 158L342 181Z" fill="#d0eaf0" />
            <path d="M448 191L416 271H565L478 164Z" fill="#75b9d0" />
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M60 ${299 + i * 26}Q230 ${286 + i * 26} 380 ${299 + i * 26}T740 ${299 + i * 26}`}
                stroke="currentColor"
                opacity={0.22 - i * 0.04}
              />
            ))}
          </>
        )}
        {(visual === "mesh" || visual === "modeling") &&
          Array.from({ length: 9 }, (_, y) =>
            Array.from({ length: 15 }, (_, x) => {
              const px = 50 + x * 50;
              const py = 35 + y * 45 + Math.sin(x * 0.7) * 30;
              return (
                <g key={`${px}-${py}`} opacity={0.25 + y * 0.06}>
                  {x < 14 && (
                    <path
                      d={`M${px} ${py}L${px + 50} ${35 + y * 45 + Math.sin((x + 1) * 0.7) * 30}`}
                      stroke="currentColor"
                      strokeWidth=".7"
                    />
                  )}
                  {y < 8 && (
                    <path
                      d={`M${px} ${py}L${px} ${py + 45}${x < 14 ? `L${px + 50} ${35 + y * 45 + Math.sin((x + 1) * 0.7) * 30}` : ""}`}
                      stroke="currentColor"
                      strokeWidth=".6"
                    />
                  )}
                  <circle
                    cx={px}
                    cy={py}
                    r={x % 4 === 0 && y % 3 === 0 ? 3 : 1.2}
                    fill="currentColor"
                  />
                </g>
              );
            }),
          )}
        {visual === "music" && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M100 ${140 + i * 35}H700`} stroke="currentColor" opacity=".3" />
            ))}
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${230 + i * 145} ${245 - i * 35})`}>
                <ellipse rx="25" ry="17" transform="rotate(-20)" fill="currentColor" />
                <path d="M23 -7V-120" stroke="currentColor" strokeWidth="5" />
              </g>
            ))}
          </>
        )}
        {visual === "learning" &&
          [0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${235 + i * 110} ${90 + i * 35}) rotate(-12)`}>
              <rect
                width="180"
                height="245"
                rx="14"
                fill={["#2b334a", "#596080", "#bec5dc"][i]}
                stroke="#dce2f4"
                strokeOpacity=".2"
              />
              {[0, 1, 2, 3, 4].map((j) => (
                <path
                  key={j}
                  d={`M32 ${55 + j * 28}H${j === 4 ? 98 : 145}`}
                  stroke={i === 2 ? "#5a6488" : "#adb5d1"}
                  strokeWidth="3"
                  opacity=".7"
                />
              ))}
            </g>
          ))}
      </svg>
    </div>
  );
}
