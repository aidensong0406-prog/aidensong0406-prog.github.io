import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Aiden",
  lastName: "Song",
  name: "Aiden Song",
  role: "Student, researcher & builder",
  avatar: "/images/monogram.svg",
  email: "aidensong0406@outlook.com",
  location: "Asia/Shanghai",
  languages: [],
  locale: "en",
};
const social: Social = [
  { name: "Email", icon: "email", link: `mailto:${person.email}`, essential: true },
];
const newsletter: Newsletter = {
  display: false,
  title: <>Notes from Aiden</>,
  description: <>Occasional updates.</>,
};
const home: Home = {
  path: "/",
  image: "/og.png",
  label: "Home",
  title: "Aiden Song — Climate, Music, and Projects",
  description:
    "Aiden Song is a student at Shanghai High School International Division working across coastal research, climate education, music, and independent projects.",
  headline: (
    <>
      Oceanography &<br />
      Computational Science
    </>
  ),
  featured: { display: false, title: <>Selected projects</>, href: "/projects" },
  subline: (
    <>
      I explore the natural world through physics and code, and build projects that bring science
      closer to people.
    </>
  ),
};
const about: About = {
  path: "/about",
  label: "About",
  title: "About — Aiden Song",
  description: "Aiden Song’s education, honors, and personal interests.",
  tableOfContent: { display: false, subItems: false },
  avatar: { display: true },
  calendar: { display: false, link: "" },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a student at Shanghai High School International Division, interested in oceanography,
        machine learning, and mathematical modeling.
      </>
    ),
  },
  work: { display: false, title: "Experience", experiences: [] },
  studies: { display: false, title: "Education", institutions: [] },
  technical: { display: false, title: "Skills", skills: [] },
};
const work: Work = {
  path: "/projects",
  label: "Projects",
  title: "Projects — Aiden Song",
  description: "Mathematical modeling, AI education, and independent projects by Aiden Song.",
};
const blog: Blog = {
  path: "/blog",
  label: "Notes",
  title: "Notes — Aiden Song",
  description: "Ideas and observations.",
};
const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Gallery — Aiden Song",
  description: "A collection of moments.",
  images: [],
};
export { person, social, newsletter, home, about, blog, work, gallery };
