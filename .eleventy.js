/**
 * Eleventy config for Hatt Digital.
 *
 * Goal: the hand-built, animation-heavy site renders EXACTLY as before, but a
 * focused set of copy/images is pulled from _data/*.json so it can be edited
 * from a free CMS (Pages CMS — see .pages.yml). Eleventy only fills in the
 * {{ placeholders }} we add to the HTML; everything else — the CSS, the JS,
 * the scroll-built hero, the markup — is passed through untouched.
 */
module.exports = function (eleventyConfig) {
  // Ship static assets and root SEO files verbatim. The .html pages are templates.
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy(".nojekyll");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  // Hero headline, edited as ONE field while keeping the word-by-word animation:
  //  - every word is wrapped in <span class="sh-word"> so the build animation runs
  //  - wrap the part you want highlighted in **double asterisks** -> adds .hl
  //  - all editor text is escaped, so it is safe to mark | safe in the template
  eleventyConfig.addFilter("heroWords", function (str) {
    if (!str) return "";
    const esc = (s) =>
      String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const tokens = [];
    String(str)
      .trim()
      .split("**")
      .forEach((part, idx) => {
        const hl = idx % 2 === 1; // text between ** ** is the highlighted part
        part
          .split(/\s+/)
          .filter(Boolean)
          .forEach((w) => tokens.push({ w, hl }));
      });
    return tokens
      .map((t) => `<span class="sh-word${t.hl ? " hl" : ""}">${esc(t.w)}</span>`)
      .join(" ");
  });

  // Highlight a phrase inside a heading, edited as ONE field: wrap the part you
  // want coloured in **double asterisks** -> <span class="hl">...</span>.
  // (Unlike heroWords this does NOT split into per-word spans.)
  eleventyConfig.addFilter("hl", function (str) {
    if (!str) return "";
    const esc = (s) =>
      String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return String(str)
      .split("**")
      .map((part, idx) => (idx % 2 === 1 ? `<span class="hl">${esc(part)}</span>` : esc(part)))
      .join("");
  });

  // Escape + convert newlines to <br>. Lets a single textarea hold a short
  // multi-line heading without exposing HTML to the editor.
  eleventyConfig.addFilter("nl2br", function (str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\r?\n/g, "<br>");
  });

  return {
    dir: { input: ".", output: "_site", data: "_data", includes: "_includes" },
    htmlTemplateEngine: "njk",
    templateFormats: ["html"]
  };
};
