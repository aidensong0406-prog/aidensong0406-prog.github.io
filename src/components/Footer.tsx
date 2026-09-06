import { person } from "@/resources";

export const Footer = () => (
  <footer className="site-footer">
    <span>
      © {new Date().getFullYear()} {person.name}
    </span>
    <nav aria-label="Contact and résumé">
      <a href={`mailto:${person.email}`}>Email</a>
      <a href="/AidenSongResume0831.pdf">Résumé</a>
    </nav>
    <span>
      Adapted from Magic Portfolio by{" "}
      <a href="https://once-ui.com/products/magic-portfolio">Once UI</a>
    </span>
  </footer>
);
