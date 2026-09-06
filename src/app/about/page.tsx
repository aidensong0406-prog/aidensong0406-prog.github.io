import { createPageMetadata } from "@/utils/metadata";
import { about } from "@/resources";
import { AboutProfile } from "@/components/AboutProfile";

export async function generateMetadata() {
  return createPageMetadata({
    title: about.title,
    description: about.description,
    path: about.path,
  });
}
export default function About() {
  return (
    <main id="main-content" className="portfolio-shell about-page">
      <header className="page-heading about-heading">
        <h1>About</h1>
      </header>
      <AboutProfile />
    </main>
  );
}
