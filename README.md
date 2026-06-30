# Hatt Digital

Marketing website for **Hatt Digital** — clean, fast websites for local businesses in Nova Scotia.

A static, dependency-free site: just HTML, CSS, and a little vanilla JavaScript. No build step, no framework, nothing to install.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Services | `services.html` |
| Projects / Portfolio | `projects.html` |
| About | `about.html` |
| FAQ | `faq.html` |
| Contact | `contact.html` |

### SEO landing pages (industry & area)

These share one reusable layout — copy any file and edit the copy to add more.

| Page | File |
|------|------|
| Web design for contractors | `web-design-for-contractors.html` |
| Web design for electricians | `web-design-for-electricians.html` |
| Web design for plumbers | `web-design-for-plumbers.html` |
| Web design for small businesses | `web-design-for-small-businesses.html` |
| Web design in Halifax | `web-design-halifax.html` |
| Web design in Dartmouth | `web-design-dartmouth.html` |

Every page links to these from the footer ("Web design for" / "Areas & contact" columns) and the
Services page, so internal linking is already in place. Add any new landing page to `sitemap.xml`
and the footer columns (search the project for `web-design-for-contractors.html` to find them).

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
- **Contact details** — email `hattdigitalns@gmail.com` and phone `902-277-4424` (`tel:+19022774424`) are used across the site, the click-to-call links, the mobile CTA bar, and the JSON-LD. Search the project for these to change them. The contact form opens a pre-filled email to that address.
- **Pricing** — package starting points (`$750` / `$1,500` / Custom) live on `index.html`, `services.html`, `faq.html`, and the home-page JSON-LD `makesOffer`. Update all of them together if prices change.
- **Founder name** — already set to **Evan Hatt** in `about.html` and the home-page JSON-LD.
- **Reviews** — the testimonials section on the home page is an honest placeholder. Replace the placeholder cards with real client quotes (no invented names) when you have them.
- **Social share image** — Open Graph/Twitter tags currently point at `assets/logo.png`. For best results, add a dedicated 1200×630 image and update the `og:image` / `twitter:image` URLs.
- **Logo** — swap `assets/logo.png` to update it everywhere.
- **Styling** — all design tokens (colours, fonts) live at the top of `assets/styles.css` as CSS variables.

## SEO files

- `robots.txt` — allows all crawlers and points to the sitemap.
- `sitemap.xml` — lists every page, including the six SEO landing pages.
- JSON-LD structured data: `ProfessionalService` + `WebSite` on `index.html` (with priced `makesOffer`),
  `FAQPage` on `faq.html`, `Service` + `BreadcrumbList` on each landing page, and `BreadcrumbList` on the
  interior pages.

## Structure

```
.
├── index.html
├── services.html
├── projects.html
├── about.html
├── faq.html
├── contact.html
├── web-design-for-contractors.html      # SEO landing pages
├── web-design-for-electricians.html     #  (shared reusable layout)
├── web-design-for-plumbers.html
├── web-design-for-small-businesses.html
├── web-design-halifax.html
├── web-design-dartmouth.html
├── assets/
│   ├── styles.css    # all styles + design tokens
│   ├── projects.css  # portfolio / case-card styles (home + projects)
│   ├── main.js       # nav, scroll reveals, hero build, FAQ, form, mobile CTA bar
│   └── logo.png      # brand mark
└── .github/workflows/pages.yml
```

---

© Hatt Digital. Built in Nova Scotia.
