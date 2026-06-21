# Hatt Digital

Marketing website for **Hatt Digital** — clean, fast websites for local businesses in Nova Scotia.

A static, dependency-free site: just HTML, CSS, and a little vanilla JavaScript. No build step, no framework, nothing to install.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Services | `services.html` |
| Projects | `projects.html` |
| About | `about.html` |
| FAQ | `faq.html` |
| Contact | `contact.html` |

## Run it locally

Because the pages load shared files from `assets/`, open them through a tiny local server (not by double-clicking the file):

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

Or use any static server you like (`npx serve`, the VS Code "Live Server" extension, etc.).

## Deploy with GitHub Pages

This repo includes a workflow that publishes the site automatically.

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Every push to `main` now deploys to `https://<your-username>.github.io/<repo-name>/`.

Using a custom domain (e.g. `hattdigital.ca`)? Add it under Settings → Pages, and create a file named `CNAME` in the repo root containing just your domain.

## Customize before launch

- **Domain** — the SEO tags (`canonical`, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD) all use `https://hattdigital.ca`. Search-and-replace this if your live domain differs.
- **Contact details** — search the project for `hello@hattdigital.ca` and the phone number `(902) 000-0000` / `+19020000000` (used in `contact.html` and the home-page JSON-LD) and replace them. The contact form opens a pre-filled email to that address.
- **Founder name** — already set to **Evan Hatt** in `about.html` and the home-page JSON-LD.
- **Social share image** — Open Graph/Twitter tags currently point at `assets/logo.png`. For best results, add a dedicated 1200×630 image and update the `og:image` / `twitter:image` URLs.
- **Logo** — swap `assets/logo.png` to update it everywhere.
- **Styling** — all design tokens (colours, fonts) live at the top of `assets/styles.css` as CSS variables.

## SEO files

- `robots.txt` — allows all crawlers and points to the sitemap.
- `sitemap.xml` — lists all six pages.
- JSON-LD structured data: `ProfessionalService` schema on `index.html`, `FAQPage` schema on `faq.html`.

## Structure

```
.
├── index.html
├── services.html
├── pricing.html
├── about.html
├── faq.html
├── contact.html
├── assets/
│   ├── styles.css   # all styles + design tokens
│   ├── main.js      # nav, scroll reveals, header typing animation, FAQ, form
│   └── logo.png     # brand mark
└── .github/workflows/pages.yml
```

---

© Hatt Digital. Built in Nova Scotia.
