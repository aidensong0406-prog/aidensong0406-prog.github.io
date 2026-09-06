import { HonorsPage } from "@/components/HonorsPanel";
import { createPageMetadata } from "@/utils/metadata";

export const metadata = createPageMetadata({
  title: "Honors | Aiden Song",
  description: "Honors and awards in environmental education, research, and academic competitions.",
  path: "/honors",
});

export default function Honors() {
  return (
    <main id="main-content" className="portfolio-shell subpage">
      <HonorsPage />
    </main>
  );
}
