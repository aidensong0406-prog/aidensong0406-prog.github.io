import { createPageMetadata } from "@/utils/metadata";
import { ResumePdfRedirect } from "./ResumePdfRedirect";

export const metadata = createPageMetadata({
  title: "Résumé — Aiden Song",
  description:
    "Aiden Song’s education, research, leadership, projects, and honors. A printable public résumé.",
  path: "/resume",
});

export default function Resume() {
  return <ResumePdfRedirect />;
}
