import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { person } from "@/resources/content";

export const runtime = "nodejs";
export const dynamic = "force-static";

const fontData = readFile(
  path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf"),
);

export async function GET() {
  const title = "Computing the Ocean, Connecting Science to People.";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 72,
        background: "#151719",
        color: "#f4f4f1",
        fontFamily: "Geist",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #626567",
            width: 68,
            height: 68,
            borderRadius: 18,
            fontSize: 26,
          }}
        >
          {person.firstName.charAt(0)}
          {person.lastName.charAt(0)}
        </div>
        <div style={{ display: "flex", fontSize: 20 }}>{person.name}</div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 90 ? 48 : title.length > 55 ? 62 : 78,
          letterSpacing: -2,
          lineHeight: 1.12,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #626567",
          paddingTop: 26,
          fontSize: 24,
        }}
      >
        <span>{person.name}</span>
        <span>Shanghai, China</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Geist", data: await fontData, style: "normal", weight: 400 }],
      headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" },
    },
  );
}
