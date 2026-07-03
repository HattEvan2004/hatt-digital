/**
 * Google Maps API key for the About-page service-area map.
 *
 * The map uses the Google Maps *Embed* API, which is free (no billing account
 * or per-use charges) — you only need a key with the "Maps Embed API" enabled.
 * The key is read from the GOOGLE_MAPS_API_KEY environment variable at build
 * time and baked into the iframe src in about.html.
 *
 * HOW TO GET A KEY (one-time):
 *   1. https://console.cloud.google.com/ -> create/pick a project.
 *   2. APIs & Services -> Library -> enable "Maps Embed API".
 *   3. APIs & Services -> Credentials -> Create credentials -> API key.
 *   4. Restrict the key: Application restrictions -> HTTP referrers ->
 *      add your domain(s) (e.g. https://hattdigital.ca/*). API restrictions ->
 *      restrict to "Maps Embed API".
 *
 * WHERE TO PUT THE KEY:
 *   - Local dev:  GOOGLE_MAPS_API_KEY=xxxx npm run build
 *   - Vercel:     Project Settings -> Environment Variables -> add
 *                 GOOGLE_MAPS_API_KEY (the build already runs `npm run build`).
 *
 * If the variable is not set, the obvious placeholder below is emitted so it's
 * clear a real key still needs to be supplied.
 */
module.exports = {
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE"
};
