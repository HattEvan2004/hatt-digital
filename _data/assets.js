/**
 * Cache-busting version tokens for static assets.
 *
 * assets/main.js is referenced without a hash and is cached for up to an hour
 * (see the /assets/(.*) header in vercel.json). That means a returning visitor
 * can keep running an OLD copy of the script until their cache expires, so a
 * fresh deploy looks like "nothing changed" on a browser that already has it
 * cached. Appending ?v=<hash-of-the-file> makes the URL change only when the
 * file's contents actually change: browsers pick up new JS immediately, and
 * unchanged deploys keep serving the cached copy.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function ver(rel) {
  try {
    const buf = fs.readFileSync(path.join(__dirname, "..", rel));
    return crypto.createHash("sha1").update(buf).digest("hex").slice(0, 8);
  } catch (e) {
    // If the file can't be read at build time, fall back to a per-build token
    // so we still bust rather than pinning a stale cache.
    return Date.now().toString(36);
  }
}

module.exports = function () {
  return {
    mainJs: "assets/main.js?v=" + ver("assets/main.js")
  };
};
