/**
 * Google Maps API key for the About-page service-area map.
 *
 * The key is read from the GOOGLE_MAPS_API_KEY environment variable at
 * build time and baked into about.html (see the Maps loader <script> there).
 *
 * WHERE TO PUT THE KEY:
 *   - Local dev:  GOOGLE_MAPS_API_KEY=xxxx npm run build
 *   - Vercel:     Project Settings -> Environment Variables -> add
 *                 GOOGLE_MAPS_API_KEY (the build already runs `npm run build`).
 *
 * If the variable is not set, the obvious placeholder below is emitted so it's
 * clear a real key still needs to be supplied. Restrict the key to the site's
 * domain(s) in the Google Cloud console (HTTP referrers) before going live.
 */
module.exports = {
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE"
};
