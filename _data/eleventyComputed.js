/**
 * Keep every page at its original ".html" URL.
 *
 * Eleventy's default "pretty permalinks" would turn about.html into about/index.html
 * (served at /about/). This site's internal links, canonical tags, sitemap and
 * Vercel redirects all point at real ".html" files, so we preserve that exactly:
 * about.html -> _site/about.html, index.html -> _site/index.html, etc.
 */
module.exports = {
  permalink: (data) => `${data.page.filePathStem}.html`
};
