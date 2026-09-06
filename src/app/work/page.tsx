import { createPageMetadata } from "@/utils/metadata";
import { work } from "@/resources";
import { PortfolioGrid } from "@/components/PortfolioGrid";
export async function generateMetadata() {
  return createPageMetadata({
    title: work.title,
    description: work.description,
    path: work.path,
  });
}
export default function Work() {
  return (
    <main id="main-content" className="portfolio-shell subpage">
      <header className="page-heading">
        <h1>Experiences</h1>
        <p>
          Research, organizations, and independent projects. Select an experience to view its
          objectives, responsibilities, and outcomes.
        </p>
      </header>
      <PortfolioGrid />
    </main>
  );
}
