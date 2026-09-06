import { Link } from "next-view-transitions";
import { ActionArrow } from "@/components/ActionArrow";

export default function NotFound() {
  return (
    <main id="main-content" className="portfolio-shell">
      <header className="page-heading">
        <h1>Page Not Found</h1>
        <p>This page is unavailable. You can return home or browse the experiences.</p>
        <div className="profile-actions">
          <Link className="site-button primary" href="/">
            <ActionArrow direction="left" />
            Home
          </Link>
          <Link className="site-button" href="/work">
            Experiences
            <ActionArrow />
          </Link>
        </div>
      </header>
    </main>
  );
}
