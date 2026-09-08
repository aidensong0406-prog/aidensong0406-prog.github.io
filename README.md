# Aiden Song — personal website

A Next.js and React portfolio adapted from [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio), with Once UI styling and custom responsive layouts.

- Home introduces “Computing the Ocean, Connecting Science to People” and three visual entry points.
- Research connects the original question, lock-exchange experiments, PINN-LOCK, coastal forecasting, Yangtze field observation, and reflection. It links directly to the unpublished research manuscript.
- Impact presents Glacier Week, the upcoming Alphadeer exhibition, and Shishijie’s family origins.
- Community tells the orchestra’s founding and listening stories alongside a school performance video, then connects shared modeling notebooks to collaborative leadership.
- About opens with the family’s stone-appreciation ritual; Education, Honors, and Interests remain accessible tabs.
- Individual experiences retain their `/work/{slug}` URLs for process, results, and media. Each highlights its parent section in navigation.
- Résumé opens the original supplied PDF directly; Class of 2027 remains the graduation year.

## Run locally

Use Node.js 22. On this Mac, add the installed runtime to your shell if needed:

```sh
export PATH="$HOME/.local/share/node-v22.23.2-darwin-arm64/bin:$PATH"
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. For an optimized preview:

```sh
npm run build
npm run start
```

## Editing and checks

Personal details are in `src/resources/content.tsx`. Projects, gallery captions, education, and honors are in `src/resources/portfolio.ts`. Section membership is defined in `src/resources/site-sections.ts`. Shared styles are in `src/resources/custom.css`; page-specific layouts have CSS modules beside their components.

Run `npm run lint`, `npm run typecheck`, and `npm run build` to validate changes. About sections support direct links and browser history. Legacy `/work` and `/climate` links open Research, with old section anchors mapped to their current destinations; climate outreach opens Impact. `/projects` opens Impact, `/music` opens Community’s music story, and `/honors` opens About’s Honors tab. `/about#community` and `/about#leadership` open Community. Redirect-only routes are excluded from the sitemap. The original résumé is served unchanged from `public/AidenSongResume0831.pdf`; all résumé links open it directly, and `/resume` redirects to it.

Community separates Crescent Philharmonic, the Mathematical Modeling Club, and Kaggle into sibling panels with matching headings, their own content, and clear spacing. The orchestra video appears near the start of its panel, before the founding story on mobile. Across Home, Research, Impact, Community, About, and project pages, independent content groups use consistent opaque borders, solid reading surfaces, and spacing. Internal dividers remain lighter than outer boundaries; the animated background remains visible between panels.

Light mode uses [Paper Shaders’ Mesh Gradient](https://shaders.paper.design/mesh-gradient) for continuously flowing pearl and slate-blue shapes, with grain disabled. The WebGL2 renderer loads only when light mode is used, caps its rendering resolution, and pauses in hidden tabs. A static gradient is retained when WebGL2 is unavailable. The footer provides a saved pause/resume preference; reduced-motion settings disable the movement automatically. Dark mode retains its existing background. Paper Shaders is licensed under Apache-2.0; its [license](public/licenses/paper-shaders-LICENSE.txt) and [notice](public/licenses/paper-shaders-NOTICE.txt) ship with the site.

Page navigation and About tabs use view transitions with brief fades and movement. Navigation stays in place, and About panels animate between their dimensions. Reduced-motion preferences disable the animations; browsers without native view transitions retain standard navigation and a CSS entrance fallback.

Honors pairs the lock-exchange photograph with research awards and uses compact competition cards with expandable full results. Education uses institution marks and expandable coursework. The marks are unmodified official assets from USACO, COMAP, IMMC, BPhO, AAPT, the John Locke Institute, MAA, SHSID, Carnegie Mellon, and Stanford, displayed in a consistent monochrome treatment.

Project media includes the supplied Alphadeer logo, lock-exchange tank photograph, Glacier Week materials, and orchestra photograph. Alphadeer’s exhibition is in preparation; Glacier Week is a separate completed project. Shishijie screenshots show a browser prototype containing synthetic study specimens. The lock-exchange comparison comes from the PINN-LOCK paper’s `suntans_t300.png`. Captions retain their reference/model distinctions and units. Storm-surge images and decorative artwork are omitted from its cards and project page. The homepage opens with a personal introduction and an initials-based portrait placeholder until a portrait is supplied. Remaining SVG artwork is decorative.

Glacier Week’s gallery includes the supplied film and full exhibition poster. The film is served as H.264/AAC MP4 with its original English subtitles, playback controls, inline playback, and no automatic preload. The Frozen Voices WeChat Channels section provides the exact account name, a copy action, search instructions, and a channel screenshot; no public account URL has been supplied.

The school performance excerpt is served from `public/videos/orchestra/school-performance.mp4` as H.264 video with the source AAC audio preserved, native controls, inline playback, and no autoplay. The author-approved PINN-LOCK PDF is served unchanged from `public/papers/pinn-lock-research-manuscript.pdf` and labeled an unpublished research manuscript.

Narrative passages also draw on the author’s supplied essays, without publishing application prompts, draft essays, or editorial comments. Yangtze route pins await actual locations; fieldwork and laboratory photographs await supplied media. Alphadeer’s 26 September 2026 exhibition is still upcoming; its future photographs are not represented as existing material.

## GitHub Pages

The site exports to `out/` using Next.js static export. React interactions, transitions, tabs, filters, and galleries run in the browser. Sharing artwork is generated as `/og.png` during the build. No application server is required.

The `.github/workflows/deploy.yml` workflow builds and publishes each push to `main`. It is configured for the account website repository `aidensong0406-prog.github.io`, which serves the site at the domain root. In repository Settings → Pages, select **GitHub Actions** as the source.

The workflow sets `NEXT_PUBLIC_SITE_URL` from GitHub Pages so canonical URLs, sharing images, and the sitemap use the public origin. For a local production build, set it explicitly to `https://aidensong0406-prog.github.io`; see `.env.example`. Local builds without this setting intentionally disallow search indexing. No authentication, analytics, remote URL-fetching APIs, or contact-form service are configured.

## Attribution and license

Adapted from Magic Portfolio by [Once UI](https://once-ui.com/products/magic-portfolio). The original template is distributed under CC BY-NC 4.0; attribution is retained in the site footer. See `LICENSE.txt` for its terms.
