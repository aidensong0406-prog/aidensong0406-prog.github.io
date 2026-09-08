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
  title: "Aiden Song — Computing the Ocean, Connecting Science to People",
  description:
    "Computing the Ocean, Connecting Science to People. Aiden Song connects computational oceanography, field observation, and science education.",
  headline: (
    <>
      Computing the Ocean,
      <br />
      Connecting Science to People.
    </>
  ),
  featured: { display: false, title: <>Research</>, href: "/research" },
  subline: (
    <>
      I use computational science and artificial intelligence to understand a changing ocean, and
      develop ways to make science accessible beyond the laboratory.
    </>
  ),
};
const about: About = {
  path: "/about",
  label: "About",
  title: "About — Aiden Song",
  description:
    "Family stone collecting, careful observation, and the questions connecting Aiden Song’s research and community work.",
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
  path: "/impact",
  label: "Impact",
  title: "Impact — Aiden Song",
  description:
    "Making scientific ideas accessible through exhibitions, education, and a digital museum.",
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
