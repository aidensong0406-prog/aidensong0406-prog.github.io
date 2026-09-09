// Project descriptions draw on the supplied résumé and Aiden's personal essays.
export type Project = {
  slug: string;
  title: string;
  category: "Research" | "Leadership" | "Creative";
  period: string;
  role: string;
  summary: string;
  subtitle?: string;
  documents?: { title: string; description: string; href: string }[];
  tags: string[];
  visual: "flow" | "mesh" | "river" | "stone" | "ice" | "learning" | "music" | "modeling" | null;
  status?: string;
  cover?: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    position?: string;
    background?: string;
  };
  sections: { title: string; text: string }[];
  deliverables?: {
    title: string;
    layout: "rows" | "grid" | "sequence";
    items: {
      title: string;
      detail: string;
      icon:
        | "translation"
        | "research"
        | "seminar"
        | "infographic"
        | "ice"
        | "food"
        | "quiz"
        | "orchestra"
        | "service"
        | "concert"
        | "model"
        | "code"
        | "mentor";
    }[];
  };
  gallery?: {
    src: string;
    title: string;
    alt: string;
    caption: string;
    kind?: "photo" | "figure" | "poster";
    video?: string;
    ratio?: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: "density-driven-flows",
    title: "PINN-LOCK: Reconstructing Density Currents",
    documents: [
      {
        title: "PINN-LOCK Research Manuscript",
        description: "Unpublished research manuscript, PDF",
        href: "/papers/pinn-lock-research-manuscript.pdf",
      },
    ],
    category: "Research",
    period: "Apr 2024 — Feb 2026",
    role: "Student researcher",
    visual: "flow",
    cover: {
      src: "/images/projects/lock-exchange/tank.png",
      alt: "Dyed fluids mixing in a lock-exchange tank.",
    },
    gallery: [
      {
        src: "/images/projects/lock-exchange/tank.png",
        title: "Lock-Exchange Experiment",
        alt: "A green density current moves through blue fluid inside a transparent laboratory tank.",
        caption:
          "The laboratory tank makes the evolving density current visible. This physical flow is the setting for my reconstruction research.",
        ratio: "2282 / 962",
      },
      {
        src: "/images/projects/lock-exchange/reconstruction.png",
        title: "Flow Reconstruction",
        alt: "Six panels compare predicted and reference velocity magnitude, pressure, and salinity.",
        caption:
          "PINN-LOCK predictions compared with SUNTANS reference fields at t = 300. Velocity magnitude, pressure, and salinity are shown in normalized units.",
        kind: "figure",
        ratio: "1480 / 786",
      },
    ],
    summary:
      "Reconstructing density-driven flows from sparse observations with physics-informed neural networks.",
    tags: ["Fluid dynamics", "Physics-informed AI"],
    sections: [
      {
        title: "From the River to the Tank",
        text: "My family collected patterned stones from the Yangtze. I first saw landscapes in them; later, I wondered about the currents and erosion that made their patterns possible. I built a lock-exchange tank to watch dense water move beneath lighter water. Seeing a larger ocean process in miniature made me ask what physics and computation could reveal beyond the motion I could observe.",
      },
      {
        title: "Research Objective",
        text: "Dense measurements of ocean currents and other geophysical flows are expensive and often unavailable. How much can the governing physics tell us when observations are sparse?",
      },
      {
        title: "Methodology",
        text: "I developed PINN-LOCK, a flow-reconstruction method combining physics-informed neural networks with governing physical equations. The project explored how physical constraints can help a model recover plausible density-driven flows from limited data.",
      },
      {
        title: "Research Program",
        text: "Through China's National Top Talent Program for Computer Science, I worked with Prof. Yang Bin at East China Normal University on physics-informed neural networks, deepening my foundation in machine learning and AI.",
      },
      {
        title: "Honors",
        text: "S.T. Yau Science Award, Global Top 10; Sichuan Science Fair, Top 9. Recognized as an Outstanding Student in the National Top Talent Program (Top 33 of 1,300+).",
      },
      {
        title: "Open Question",
        text: "How far can physics and computation take us beyond our observations, and where do we need to measure or listen again?",
      },
    ],
  },
  {
    slug: "shishijie",
    title: "Shishijie",
    subtitle: "From a Family Collection to a Digital Museum",
    category: "Creative",
    period: "Dec 2025 — Present",
    role: "Founder & developer",
    visual: "stone",
    cover: {
      src: "/images/projects/shishijie/specimen-study.png",
      alt: "A stone specimen and observation tools in the Shishijie museum prototype.",
      position: "35% center",
    },
    summary:
      "A family ritual of turning stones, moving lamps, and finding patterns, translated into an interactive museum.",
    tags: ["Interactive 3D", "Digital preservation"],
    gallery: [
      {
        src: "/images/projects/shishijie/specimen-study.png",
        title: "Specimen Study",
        alt: "A synthetic Channel Stone specimen with lighting controls, surface views, and an observation panel.",
        caption:
          "Lighting controls and observations accompany a synthetic study specimen in the browser prototype.",
      },
      {
        src: "/images/projects/shishijie/museum-atrium.png",
        title: "Museum Architecture",
        alt: "Shishijie browser prototype showing a two-level museum atrium and navigation controls.",
        caption:
          "The browser prototype places exhibits inside a navigable museum. The specimens shown are synthetic studies.",
      },
      {
        src: "/images/projects/shishijie/contribution-draft.png",
        title: "Contribution Draft",
        alt: "The prototype contribution form for selecting stone photographs, with a notice that drafts stay on the visitor’s device.",
        caption:
          "The contribution prototype lets visitors prepare a stone record. In this version, drafts remain on the visitor’s device.",
      },
    ],
    sections: [
      {
        title: "A Family Ritual",
        text: "At home, we washed mud from Yangtze stones, turned them, and moved lamps until a shape appeared. My grandfather would wait for the right angle: a dark streak might become a mountain ridge or a figure from a story. The stone on my desk reveals a walnut tree in a particular light.",
      },
      {
        title: "What a Photograph Leaves Out",
        text: "Shishijie began as a digital display of the family collection. Photographs could show an object, but they left out the quiet work of looking: turning a stone, changing the light, and finding a pattern for yourself. I wanted visitors to take part in that process.",
      },
      {
        title: "Designing the Experience",
        text: "I developed rotatable exhibits, movable lighting, and rooms visitors could explore. The browser prototype shown here uses synthetic study specimens to develop those interactions. The family collection and our way of looking at it remain the starting point.",
      },
      {
        title: "Reflection",
        text: "A feature mattered when it brought the experience closer to the ritual at home. That became a way to judge my design decisions: does this help someone look more carefully, or simply add another control?",
      },
      {
        title: "Opening the Collection",
        text: "I also designed a contribution workflow so the museum could eventually include other people’s stones and observations. In the current prototype, visitors can prepare photographs and a stone record; their drafts remain on their own device.",
      },
    ],
  },
  {
    slug: "glacier-week",
    title: "SHSID Glacier Week",
    category: "Leadership",
    period: "Mar — May 2026",
    role: "Project manager",
    visual: "ice",
    cover: {
      src: "/images/projects/glacier-week/exhibition.jpg",
      alt: "Students exploring the melting-glacier installation during Glacier Week.",
      position: "center 40%",
    },
    gallery: [
      {
        src: "/images/projects/glacier-week/film-preview.jpg",
        video: "/videos/glacier-week/frozen-voices.mp4",
        title: "Glacier Week Film",
        alt: "The Frozen Voices team presents SHSID Glacier Week in its Sea Beyond 2026 film.",
        caption:
          "Our Sea Beyond 2026 film introduces the team, the exhibition, and our climate-education work. 2:59, with English subtitles.",
        ratio: "960 / 544",
      },
      {
        src: "/images/projects/glacier-week/exhibition.jpg",
        title: "Glacier Week Exhibition",
        alt: "Students gather around a melting-ice installation at the school exhibition.",
        caption:
          "Visitors explore the glacier installation during the four-day exhibition, which welcomed more than 84 classes across three school sites.",
      },
      {
        src: "/images/projects/glacier-week/poster.jpg",
        title: "Exhibition Poster",
        alt: "SHSID Glacier Week poster connecting glaciers with everyday life and introducing the lecture, exhibition, and educational videos.",
        caption:
          "The Glacier Week poster introduces our lecture, exhibition, and videos, connecting glacier loss to the water and cultures we share.",
        kind: "poster",
        ratio: "1280 / 1811",
      },
      {
        src: "/images/projects/glacier-week/sea-beyond-award.jpg",
        title: "Sea Beyond Recognition",
        alt: "Sea Beyond award announcement naming Frozen Voices from SHSID first in the glaciers category, alongside a team photograph.",
        caption:
          "The Sea Beyond announcement recognizes Frozen Voices as first place in the glaciers category.",
      },
      {
        src: "/images/projects/glacier-week/climate-quiz.png",
        title: "Climate Quiz",
        alt: "The exhibition's colourful climate quiz asks a multiple-choice question about carbon stored in permafrost.",
        caption:
          "I coded an online trivia game as part of the exhibition's climate-education activities.",
      },
    ],
    summary:
      "A four-day climate exhibition across three school sites, connecting glacier loss to everyday life.",
    tags: ["Climate education", "Exhibition design"],
    deliverables: {
      title: "Exhibition Components",
      layout: "grid",
      items: [
        { title: "Infographics", detail: "Research-based climate education", icon: "infographic" },
        { title: "Art Installation", detail: "A physical depiction of glacier melt", icon: "ice" },
        { title: "Food Display", detail: "Sea-level rise and Shanghai cuisine", icon: "food" },
        { title: "Online Trivia", detail: "An interactive game I coded", icon: "quiz" },
      ],
    },
    sections: [
      {
        title: "The Design Question",
        text: "When I began planning Glacier Week, posters felt too distant. I added a melting-ice installation with ecosystem models, but kept asking what was missing from the audience’s experience. How could glacier loss become something people could connect with directly?",
      },
      {
        title: "From Viewing to Participating",
        text: "I introduced a dining exhibition linking glaciers, sea-level rise, and familiar foods. Alongside the installation, I coded an online trivia game and helped develop infographics and videos. I led an eight-member team through a four-day exhibition across three school sites, welcoming more than 84 visiting classes.",
      },
      {
        title: "Public Outreach",
        text: "Frozen Voices extended the exhibition through educational videos on topics including albedo feedback and the Atlantic Meridional Overturning Circulation, reaching more than 10,000 viewers in total.",
      },
      {
        title: "Reflection",
        text: "Each time the exhibition felt incomplete, I looked for another way for people to participate: a table, a game, a conversation. I began judging an idea by the experience it made possible, as well as the information it contained.",
      },
      {
        title: "Honors",
        text: "The project won global first place in the Glaciers category of Sea Beyond and secured €5,000 in sponsorship.",
      },
    ],
  },
  {
    slug: "computational-oceanography",
    title: "Storm-Surge Prediction",
    category: "Research",
    period: "Jun — Aug 2026",
    role: "Research intern at ECNU",
    visual: null,
    summary:
      "Predicting storm-induced coastal water levels directly on an ocean model's triangular mesh.",
    tags: ["Graph neural networks", "Ocean forecasting"],
    sections: [
      {
        title: "Research Context",
        text: "In Prof. Jianzhong Ge's research group at East China Normal University, I took ownership of an ongoing computational oceanography and machine-learning project, reconstructing its data, codebase, and experimental history.",
      },
      {
        title: "Models and Experiments",
        text: "I developed and evaluated forecasting systems based on MeshGraphNets, designed controlled experiments, and managed GPU training across multiple computing servers. The model predicts storm-induced water levels on the native FVCOM triangular mesh and feeds its predictions back into later forecast steps.",
      },
      {
        title: "Research Outputs",
        text: "I analyzed performance under ordinary and extreme conditions and translated the findings into scientific figures, presentations, and an IEEE-style research manuscript. This research uses prescribed atmospheric forcing rather than an operational weather-and-ocean forecast.",
      },
    ],
  },
  {
    slug: "yangtze-expedition",
    title: "Yangtze River Expedition",
    category: "Research",
    period: "Jun — Jul 2026",
    role: "Field researcher",
    visual: "river",
    summary:
      "A self-directed investigation across more than ten cities, combining over thirty water samples with more than fifty conversations.",
    tags: ["Fieldwork", "People & environment"],
    sections: [
      {
        title: "Planning the Investigation",
        text: "I began with a map of confluences, cities, and tributaries, balancing geographic variety with the time available. Each planned stop had a sampling bottle prepared in advance. I wanted every stop to help me ask a more precise question about the river I had grown up collecting stones beside.",
      },
      {
        title: "When the Plan Met the Terrain",
        text: "One carefully placed marker led to a cliff or an overgrown approach. In the mountains, at around 3,000 meters, I searched for a way to reach the water. A staircase and a muddy path finally made sampling possible. Across the expedition, I collected more than thirty samples in over ten cities.",
      },
      {
        title: "Local Voices",
        text: "I brought printed questionnaires, but a conversation with a boat operator soon moved beyond the sheet. Over more than fifty interviews, I heard about tourism, fears of relocation, and concerns about mudslides. These accounts showed the river through the livelihoods and attachments of the people I met.",
      },
      {
        title: "Reflection",
        text: "I had treated access as something I could settle on a map and an interview as something I could prepare on paper. The riverbank and the conversations revised both assumptions. Fieldwork meant adapting the plan while keeping the question clear, and listening for what I had not thought to ask.",
      },
      {
        title: "An Open Question",
        text: "How can physical evidence and local accounts inform one another without losing what each can tell us? Water samples describe aspects of the river; conversations reveal why its changes matter. I am still working on how to bring those forms of knowledge together.",
      },
    ],
  },
  {
    slug: "alphadeer",
    title: "Alphadeer",
    category: "Leadership",
    period: "Mar 2025 — Present",
    role: "Founder & developer",
    visual: "learning",
    status: "Exhibition planned for 26 September 2026",
    cover: {
      src: "/images/projects/alphadeer/logo.png",
      alt: "Alphadeer's blue deer logo.",
      fit: "contain",
      background: "#edf8fd",
    },
    summary: "A student-led education initiative focused on preparing an upcoming exhibition.",
    tags: ["AI education", "Student leadership"],
    deliverables: {
      title: "Education Programs",
      layout: "rows",
      items: [
        {
          title: "Translation",
          detail: "80-page UNESCO student AI framework translated into Chinese",
          icon: "translation",
        },
        {
          title: "Literature Review",
          detail: "5,000+ words drawing on 80+ academic sources",
          icon: "research",
        },
        {
          title: "Public Seminars",
          detail: "Speakers secured for 10+ online climate seminars",
          icon: "seminar",
        },
      ],
    },
    sections: [
      {
        title: "Exhibition",
        text: "Alphadeer's main exhibition is planned for 26 September 2026. I founded the initiative and lead a team of more than 30 members working on educational programming, a WeChat public account, and website development.",
      },
      {
        title: "Translation and Research",
        text: "I translated UNESCO's 80-page AI competency framework for students into Chinese to make it more accessible to students and educators. With the University of Macau, I also wrote a literature review of over 5,000 words synthesizing more than 80 academic sources on AI education.",
      },
      {
        title: "Educational Seminars",
        text: "By connecting with UNESCO China staff and other professionals, the team secured speakers for more than ten online seminars on climate-change trends.",
      },
    ],
  },
  {
    slug: "crescent-philharmonic",
    title: "Crescent Philharmonic Orchestra",
    category: "Leadership",
    period: "Sep 2024 — Present",
    role: "Founder & leader",
    visual: "music",
    cover: {
      src: "/images/projects/orchestra/concert.jpg",
      alt: "The orchestra performing on stage with strings, winds, and a grand piano.",
      position: "center 65%",
    },
    gallery: [
      {
        src: "/images/projects/orchestra/performance-preview.jpg",
        title: "School Performance Film",
        alt: "Crescent Philharmonic performing together with strings, winds, piano, and a conductor.",
        caption: "An original school performance excerpt, 1:16, with the source audio preserved.",
        video: "/videos/orchestra/school-performance.mp4",
        ratio: "16 / 9",
      },
      {
        src: "/images/projects/orchestra/concert.jpg",
        title: "Orchestra Performance",
        alt: "A live orchestra performance brings string and wind musicians together around a grand piano.",
        caption:
          "The orchestra brings together the school's string and wind programs for shared rehearsals and performances.",
        ratio: "4 / 3",
      },
    ],
    summary:
      "The school's first full orchestra, bringing separated string and wind programs into one ensemble.",
    tags: ["Music", "Community service"],
    deliverables: {
      title: "Orchestra Programs",
      layout: "rows",
      items: [
        {
          title: "School Orchestra",
          detail: "String and wind programs united in one ensemble",
          icon: "orchestra",
        },
        {
          title: "Community Service",
          detail: "Weekly performances at a hospital and nursing home",
          icon: "service",
        },
        {
          title: "School Concerts",
          detail: "A concert for 500+ listeners and student-led performances",
          icon: "concert",
        },
      ],
    },
    sections: [
      {
        title: "Founding the Orchestra",
        text: "Hearing strings and winds converge in Gershwin’s Rhapsody in Blue made me want to bring our school’s separate programs together. I founded Crescent Philharmonic in tenth grade so we could perform music that needed both. With support from the music department, we worked through different rehearsal habits to build a shared musical language.",
      },
      {
        title: "Community Performances",
        text: "I lead more than 30 volunteer musicians in weekly performances at Ruijin Hospital and Youyouxin Nursing Home. The group has contributed more than 100 volunteer hours of live music for patients and elderly residents.",
      },
      {
        title: "School Concerts",
        text: "I organized and led an orchestra concert for more than 500 audience members. The orchestra also performed at the school art festival and the school's first student-led concert.",
      },
      {
        title: "Listening After the Bow",
        text: "After a clarinet performance at a hospital, an elderly listener struggled to tell me, ‘A concerto. This is a concerto.’ I bowed and left. Only on the ride home did I recognize my mistake: I had entered expecting sadness, while he wanted to tell me what he heard in the music.",
      },
      {
        title: "Reflection",
        text: "I began staying after the bow, listening to questions and taking requests. When someone asked for Howl’s Moving Castle, I practiced it and brought it on our next visit. I could not resolve the uncertainty of a hospital stay, but I could leave time for a conversation whose subject was music. Making room for someone’s response became part of the performance itself.",
      },
    ],
  },
  {
    slug: "mathematical-modeling-club",
    title: "Mathematical Modeling Club",
    category: "Leadership",
    period: "Sep 2023 — Present",
    role: "President",
    visual: "modeling",
    summary:
      "A student community of more than 100 members studying mathematical modeling and preparing for competitions.",
    tags: ["Mathematical modeling", "Student leadership"],
    deliverables: {
      title: "Training Program",
      layout: "sequence",
      items: [
        {
          title: "Model Selection",
          detail: "Weekly training on models and solution strategies",
          icon: "model",
        },
        { title: "Implementation", detail: "Starter code and templates for members", icon: "code" },
        {
          title: "Competition Preparation",
          detail: "Expert talks and individual mentoring",
          icon: "mentor",
        },
      ],
    },
    sections: [
      {
        title: "A Place to Start",
        text: "In our mathematical modeling community, I saw students face two extremes: a blank screen or an already completed solution to imitate. I designed starter notebooks that supplied a common foundation while leaving the central assumptions and modeling choices open.",
      },
      {
        title: "Ideas That Travel",
        text: "I connected members whose approaches could strengthen each other, shared useful ideas in our group chat, and incorporated student-written functions into later notebooks. An idea could become the starting point for another group, then return in a different form.",
      },
      {
        title: "A Shared Memory",
        text: "Members began searching earlier code and solutions, organizing them, and building on one another’s work. The notebooks became a record of the community’s contributions rather than a collection written by me alone.",
      },
      {
        title: "Reflection",
        text: "Leadership meant creating a foundation others could question and extend. Leaving decisions open gave members room to take ownership; keeping their contributions in future lessons helped that ownership last.",
      },
      {
        title: "Competition Preparation",
        text: "I also invite expert speakers and mentor students preparing for HiMCM, IMMC, and the HKU × SHSID competition. Members have earned Outstanding, Finalist, and Meritorious placements.",
      },
    ],
  },
];

export function getProject(slug: string): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Unknown portfolio project: ${slug}`);
  return project;
}

export const education = [
  {
    title: "Shanghai High School International Division",
    subtitle: "Secondary education; scholarship recipient, top 7%",
    period: "2022 — 2027",
  },
  {
    title: "Carnegie Mellon University",
    subtitle: "Summer coursework: Concepts of Math (96/100), Imperative Computing (88/100)",
    period: "Summer 2025",
  },
  {
    title: "Stanford University",
    subtitle: "Summer coursework: Introduction to Data Science",
    period: "Summer 2024",
  },
];

export const community: {
  title: string;
  role: string;
  period: string;
  text: string;
  href?: string;
}[] = [
  {
    title: "Crescent Philharmonic Orchestra",
    href: "/work/crescent-philharmonic",
    role: "Founder & leader",
    period: "2024 — Present",
    text: "Brought string and wind programs together into the school's first full orchestra, for shared rehearsals and concerts. Led community performances at Ruijin Hospital and Youyouxin Nursing Home, and organized a concert for 500+ listeners.",
  },
  {
    title: "Mathematical Modeling Club",
    href: "/work/mathematical-modeling-club",
    role: "President",
    period: "2023 — Present",
    text: "Lead 100+ members through weekly training, starter code, model-selection guidance, and competition mentoring. Invite expert speakers and support students preparing for HiMCM and IMMC.",
  },
  {
    title: "US–China Collaboration on Climate Solutions",
    role: "Student participant",
    period: "Mar — May 2026",
    text: "Selected among 15 students from China to collaborate with American and Chinese students on climate policy and sustainability at Stanford. Co-created a Coastal Protection Day online media campaign and website.",
  },
  {
    title: "Service for Ocean",
    role: "High school representative",
    period: "2023 — 2024",
    text: "Spoke about marine conservation to more than 100 peers and educators in support of the UN Ocean Decade, and served as a docent at a local ocean park.",
  },
];

export const honors: { name: string; result: string; year: string; project?: string }[] = [
  {
    name: "S.T. Yau Science Award",
    result: "Global Top 10",
    year: "2025–26",
    project: "density-driven-flows",
  },
  {
    name: "Sichuan Science Fair",
    result: "Top 9",
    year: "2025–26",
    project: "density-driven-flows",
  },
  {
    name: "Sea Beyond",
    result: "Global 1st in the Glaciers category, €5,000 sponsorship",
    year: "2026",
    project: "glacier-week",
  },
  { name: "USACO", result: "Gold", year: "2026" },
  { name: "HiMCM", result: "Finalist, top 21 of 585", year: "2025" },
  { name: "IMMC", result: "International finalist and two-time regional finalist", year: "2025" },
  { name: "British Physics Olympiad", result: "Gold", year: "2025" },
  { name: "Physics Bowl", result: "D1 Gold (2025), D2 Silver (2026)", year: "2025–26" },
  { name: "John Locke Essay Competition", result: "Shortlisted in Public Policy", year: "2026" },
  { name: "AIME", result: "9 points", year: "2024" },
];
