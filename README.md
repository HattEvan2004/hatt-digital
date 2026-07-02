# Hatt Digital

Marketing website for **Hatt Digital** — clean, fast websites for local businesses in Nova Scotia.

A static site of hand-coded HTML, CSS, and a little vanilla JavaScript. Editable copy for the Home page lives in `_data/*.json` and is stitched into the HTML at build time by [Eleventy](https://www.11ty.dev/), so the content can be edited from a free CMS (see **Editing the site** below) without touching markup. The CSS, JavaScript, and animations are passed through untouched.

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Services | `services.html` |
| About | `about.html` |
| FAQ | `faq.html` |
| Quote / project request | `quote.html` |
| Contact (redirects to `quote.html`) | `contact.html` |

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

The site is built with Eleventy. Install once, then run the dev server:

```bash
npm install
npm run dev      # builds + serves with live reload at http://localhost:8080
```

To produce the deployable output without serving:

```bash
npm run build    # writes the finished site to _site/
```

## Editing the site (no code)

Content for the Home page is stored in `_data/home.json` and shared contact
details in `_data/site.json`. You can edit these from a browser — no install —
using **[Pages CMS](https://pagescms.org)**:

1. Go to <https://app.pagescms.org> and sign in with GitHub.
2. Open this repository and choose the `main` branch.
3. Edit the labelled fields (headings, paragraphs, contact info) and save.

Saving commits to `main`, which rebuilds and redeploys the site automatically.
The structure of the editor is defined in `.pages.yml`.

## Deploy with Vercel

The site is hosted on Vercel and deploys automatically on every push to `main`.
Vercel runs the Eleventy build defined in `vercel.json`:

- **Build command:** `npm run build`
- **Output directory:** `_site`

Redirects and security headers are configured in `vercel.json` as well. No other
setup is needed — push to `main` (or save in the CMS) and Vercel rebuilds and
redeploys the finished site.

## Customize before launch

- **Domain** — the SEO tags (`canonical`, Open Graph, `sitemap.xml`, `robots.txt`, JSON-LD) all use `https://hattdigital.ca`. Search-and-replace this if your live domain differs.
- **Contact details** — email `hattdigitalns@gmail.com` and phone `902-277-4424` (`tel:+19022774424`) are used across the site, the click-to-call links, the mobile CTA bar, and the JSON-LD. Search the project for these to change them.
- **Quote form** — every CTA goes to `quote.html`, the single project-quote form, which submits through **Forminit**. The Forminit Form ID lives in one place: `FORMINIT_FORM_ID` near the top of `assets/forminit.js`. The CTAs pass the chosen package via a URL parameter (`quote.html?package=starter|business|growth`); `assets/forminit.js` reads `?package=` to pre-select the website-type tile and keep the hidden `selected_package` field in sync. The quote page also submits `selected_budget` (a per-package budget slider), `unsure_budget`, and a hidden `form_type=Website Quote`. `contact.html` is now just a redirect to `quote.html` (preserving any query string).
- **Pricing** — prices are intentionally **not** shown publicly. The package cards on `index.html` and `services.html` use value-based labels instead of numbers, and every project is quoted individually from the form. Keep it that way unless you decide to publish pricing again.
- **Founder name** — already set to **Evan Hatt** in `about.html` and the home-page JSON-LD.
- **Reviews** — the testimonials section on the home page is an honest placeholder. Replace the placeholder cards with real client quotes (no invented names) when you have them.
- **Social share image** — Open Graph/Twitter tags currently point at `assets/logo.png`. For best results, add a dedicated 1200×630 image and update the `og:image` / `twitter:image` URLs.
- **Logo** — swap `assets/logo.png` to update it everywhere.
- **Styling** — all design tokens (colours, fonts) live at the top of `assets/styles.css` as CSS variables.

## SEO files

- `robots.txt` — allows all crawlers and points to the sitemap.
- `sitemap.xml` — lists every page, including the six SEO landing pages.
- JSON-LD structured data: `ProfessionalService` + `WebSite` on `index.html` (with `makesOffer`, no public prices),
  `FAQPage` on `faq.html`, `Service` + `BreadcrumbList` on each landing page, and `BreadcrumbList` on the
  interior pages.

## Structure

```
.
├── index.html
├── services.html
├── about.html
├── faq.html
├── quote.html                           # project quote form (Forminit-backed)
├── contact.html                         # redirects to quote.html
├── web-design-for-contractors.html      # SEO landing pages
├── web-design-for-electricians.html     #  (shared reusable layout)
├── web-design-for-plumbers.html
├── web-design-for-small-businesses.html
├── web-design-halifax.html
├── web-design-dartmouth.html
├── assets/
│   ├── styles.css    # all styles + design tokens
│   ├── projects.css  # portfolio / case-card + carousel styles (home)
│   ├── main.js       # nav, scroll reveals, hero build, FAQ, mobile CTA bar
│   ├── forminit.js   # quote form: Forminit submit, package pre-select, uploads
│   └── logo.png      # brand mark
└── .github/workflows/pages.yml
```

---

© Hatt Digital. Built in Nova Scotia.
