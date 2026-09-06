# Aiden Song — personal website

A Next.js and React portfolio adapted from [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio), with Once UI styling and custom responsive layouts.

- Home introduces selected experiences and research.
- About uses accessible tabs for education, research, leadership, honors, and interests.
- Experiences has category filters and eight individual project pages.
- Honors has a dedicated page with research awards and year-filtered academic competitions.
- Résumé opens the original supplied PDF directly.

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

Personal details are in `src/resources/content.tsx`. Projects, gallery captions, education, and honors are in `src/resources/portfolio.ts`. Shared styles are in `src/resources/custom.css`; page-specific layouts have CSS modules beside their components.

Run `npm run lint`, `npm run typecheck`, and `npm run build` to validate changes. About sections and experience filters support direct links and browser history. The original résumé is served unchanged from `public/AidenSongResume0831.pdf`; all résumé links open it directly, and `/resume` redirects to it.

Page navigation and About tabs use view transitions with brief fades and movement. Navigation stays in place, and About panels animate between their dimensions. Reduced-motion preferences disable the animations; browsers without native view transitions retain standard navigation and a CSS entrance fallback.

Project media includes the supplied Alphadeer logo, lock-exchange tank photograph, Glacier Week materials, and orchestra photograph. Alphadeer’s exhibition is in preparation; Glacier Week is a separate completed project. Shishijie screenshots show a browser prototype containing synthetic study specimens. The lock-exchange comparison comes from the PINN-LOCK paper’s `suntans_t300.png`. Captions retain their reference/model distinctions and units. Storm-surge images and decorative artwork are omitted from its cards and project page. The homepage opens with a personal introduction and an initials-based portrait placeholder until a portrait is supplied. Remaining SVG artwork is decorative.

## GitHub Pages

The site exports to `out/` using Next.js static export. React interactions, transitions, tabs, filters, and galleries run in the browser. Sharing artwork is generated as `/og.png` during the build. No application server is required.

The `.github/workflows/deploy.yml` workflow builds and publishes each push to `main`. It is configured for the account website repository `aidensong0406-prog.github.io`, which serves the site at the domain root. In repository Settings → Pages, select **GitHub Actions** as the source.

The workflow sets `NEXT_PUBLIC_SITE_URL` from GitHub Pages so canonical URLs, sharing images, and the sitemap use the public origin. For a local production build, set it explicitly to `https://aidensong0406-prog.github.io`; see `.env.example`. Local builds without this setting intentionally disallow search indexing. No authentication, analytics, remote URL-fetching APIs, or contact-form service are configured.

## Attribution and license

Adapted from Magic Portfolio by [Once UI](https://once-ui.com/products/magic-portfolio). The original template is distributed under CC BY-NC 4.0; attribution is retained in the site footer. See `LICENSE.txt` for its terms.
