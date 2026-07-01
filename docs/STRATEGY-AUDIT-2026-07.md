# Hatt Digital — Research, Positioning & Homepage Audit (July 2026)

**Scope:** research + strategy only. No code was changed. This document is the plan for taking hattdigital.ca from its current ~6/10 to a true 9/10.

**One-line diagnosis:** the site is technically clean and honestly written in places, but it is dressed up as a *developer's* site (fake compilers, code editors, terminal chrome) instead of a *customer's* site, it hides its two strongest weapons (price transparency and speed), and it has no human being or real place on the page. The copy patterns that feel "AI/template" are identifiable and fixable line by line.

---

## 1. Competitor research summary

13 local competitors reviewed (Halifax, Dartmouth, and Nova Scotia-wide):

| Competitor | Type | Core pitch | Pricing shown? |
|---|---|---|---|
| RM Web Designs (Halifax) | Solo owner | "Built by Rob, the owner — not a junior or an overseas contractor." 15+ yrs, WordPress/Elementor, management plans | No |
| Mumford Connect (Valley/Halifax) | Small shop | 20+ yrs, full-service: design + hosting + domains + maintenance, "accessible prices" | Hosting only |
| Samson Digital (NS-wide) | Small agency | "Stand out, attract leads, grow." SEO-first, "no cookie-cutter templates," chamber/BNI networking, city landing pages for every NS town | No |
| Go Smart Media (Halifax) | Small agency | "100% bespoke," "page #1 of Google," WordPress, tourism/small-biz grants | No |
| Creative Curve Media (Halifax) | Small agency | 15+ yrs, mobile-friendly, CMS, Canadian hosting, hands-on support | No |
| Halifax Web Solutions | Small agency | 20+ yrs, bundles (SEO/social/maintenance ~$97/mo each), 50/50 payment terms | Partially (monthly services) |
| Nicom IT / Nicom Interactive | IT firm | Corporate process: consultation → proposal → 6–8 week launch | No |
| ICS Creative Agency (Atlantic) | Mid agency | "No templates, custom only," 1,500+ businesses since 2009, full marketing stack | No |
| Boom12 (Halifax) | Small shop | "12+ years, reliable and affordable small business web design" | No |
| Every IT Solution (Dartmouth) | IT firm | "Transform your vision into functional code," PHP/WordPress/Shopify/Squarespace | No |
| Hard Drive Cafe (Dartmouth) | Computer shop | Repairs + websites + hosting, quote on contact | No |
| Hop Creative (Halifax) | Solo/duo | 15+ yrs graphic & web design | No |
| WebsitesCA / subscription model | Productized | Annual subscription: "free website" + domain + email + 12 hrs support | Yes (subscription) |

*(Market price context: Let's Nurture publicly cites $1,500–$3,000 as the typical small-business range; Nicom quotes 6–8 week timelines. Hatt Digital's quote slider runs $500–$1,500.)*

### 1a. What they ALL say (the noise Hatt Digital must not add to)

Nearly every competitor repeats the same eight claims:

1. "Mobile-friendly / responsive design"
2. "Get found on Google / rank page 1 / SEO built in"
3. "Custom, not a cookie-cutter template"
4. "X+ years of experience" (12, 15, 20+ — everyone leads with tenure)
5. "Grow your business / more leads / more customers"
6. "We're local"
7. A services ladder that upsells hosting, maintenance, PPC, social
8. **No public pricing.** Not one local shop shows project prices. "Contact us for a quote" is universal.

Two structural camps: **IT firms that also do websites** (Nicom, Every IT, Hard Drive Cafe — websites are a side counter) and **marketing agencies where the website is the entry to a retainer** (Go Smart, ICS, Samson, Creative Curve). Both camps write in third-person corporate "we."

### 1b. The uncomfortable finding

**"You deal directly with the owner/builder" is already taken locally.** RM Web Designs leads with exactly Hatt Digital's current differentiator, backed by 15+ years Evan can't claim. "Direct and local" is necessary but it cannot be the *headline* differentiator — it's table stakes plus one sentence.

### 1c. What nobody local says (Hatt Digital's open ground)

- **A number.** Nobody publishes a project price or even a starting range. FAQ pages everywhere dodge "how much?" — so does Hatt Digital's, which is a wasted weapon since the quote page already anchors $500–$1,500.
- **A deadline.** Nobody says how fast. Nicom implies 6–8 weeks. Hatt Digital's FAQ already says 1–3 weeks — it's buried.
- **"You own everything."** The subscription/hosting-lock camp (WebsitesCA model, hosting-centric shops) creates a real fear: lose the relationship, lose the site. Hatt Digital's FAQ answer on ownership is excellent and invisible.
- **Proof by demonstration.** Every competitor *claims* fast/modern; almost all ship WordPress + page-builder sites. A hand-coded site with visible Lighthouse/PageSpeed receipts is a provable claim available to a brand-new studio with zero clients.
- **Honesty about being new.** Everyone leads with decades. A new studio that says "I'm new, I'm hungry, and I'm priced like it — here's what you risk and here's what you don't (you own everything, flat quote, no lock-in)" is the only credible counter-position to "20+ years."

---

## 2. Positioning recommendation

**Position:** *The straight-answer website guy for Nova Scotia trades and local services. Real prices on the page, live in weeks not months, and you own every piece of it.*

Four planks, in priority order:

1. **Radical price transparency** — publish starting ranges on the homepage packages ("Most Starter sites land between $500–$800. Business sites $900–$1,500. Growth: quoted."). This single move separates Hatt Digital from all 13 competitors, answers the #1 FAQ, and pre-qualifies leads. Keep the custom-quote flexibility — a *range* is not a lock-in.
2. **Speed with a number** — "Live in 1–3 weeks once I have your content." vs. the market's 6–8 weeks. Put it in the hero receipts, packages, and process.
3. **Ownership, no hostage-taking** — "Your domain, your site, your content — in your name, from day one. Leave whenever you want." This is a direct foil to the hosting-lock camp and reads as honesty, not marketing.
4. **Trades niche** — the industry pages (contractors, electricians, plumbers) already exist. Lean in: the featured demo, the before/after fiction, and the copy examples should all smell like trades, not office supplies. (This is the Hook Agency playbook at local scale: niche proof beats generic breadth.)

"Local + direct with the builder" stays — as supporting texture (Evan's face, first-person voice, real place names), not as the headline claim RM already owns with more tenure.

**What NOT to claim:** years of experience, client counts, rankings guarantees, "case studies," "impossible to ignore." Anything a skeptical contractor could ask "says who?" about must either have a receipt or be cut.

---

## 3. Homepage section-by-section audit

Order as rendered by `index.html`. Overall homepage today: **6/10**.

### 3.1 Header/nav — 7/10
Good: phone number visible, sticky, clean. Problems:
- CTA label **"Start a Website Project"** is wordy and premature — a first-time visitor isn't "starting a project," they're sniffing around. "Get a Quote" matches intent and the destination (quote.html).
- Nav label "My Portfolio" is fine, but the page holds demos, not client work (see 3.4).

### 3.2 Hero ("cinematic scroll-built" full-viewport + fake compiler) — 5/10
The weakest-per-importance section. Specific problems:

- **Headline "Websites that work as hard as you do."** is a stock line — it appears on hundreds of agency and template sites and is exactly the kind of flattery-cliché AI writes. It says nothing about what, where, for whom, or why believe it.
- **Sub-copy is abstract and voice-broken:** "Hatt Digital builds clean, professional websites… **Our** goal is to help people understand what you do…" — the entire rest of the site is first-person "I" (correctly, for a one-person studio). "Our" here quietly signals fake-agency, the exact thing the brand promises not to be.
- **The compiler window is for the wrong audience.** A fake terminal "compiling hatt-digital/index.html," JetBrains Mono, canvas particle field, "Scroll to explore," scroll-jacked build-in: this is developer theatre. The buyer is a plumber on a phone between jobs. To them this reads either as noise or as "techy and expensive." It also costs real mobile performance (100vh stage + canvas + scroll listeners) and delays the first piece of actual evidence by a full viewport.
- **No proof in the hero.** No price signal, no timeline, no locality beyond an eyebrow label, no face, no reviews (fair — there are none yet — but the receipts that DO exist aren't here either).

Keep: the word-by-word build animation is tasteful; the two-CTA pattern is right.

### 3.3 Before/after slider — 7/10 (best idea on the page)
Show-don't-tell, interactive, on-message. Problems:
- It's fiction with a disclaimer ("Example mockup… not based on a real client."). Honest, but the disclaimer deflates the payoff. Reframe the label from implied-portfolio to teaching aid: "This is the standard I build to — drag it."
- The "before" is a strawman cartoon (visitor counter #004271, "best viewed at 1024×768"). Fun, but 2005-grade; real 2026 bad sites are mediocre Wix pages, not GeoCities. A slightly-less-cartoonish "before" is more damning because it looks like sites owners actually have.
- The three benefit bullets under it ("Better first impression / Easier to contact / Built for mobile and local search") are filler triads — cut or replace with receipts (see §5).

### 3.4 Portfolio preview — 5/10
- **Heading "Mini case studies, built to convert." is the most damaging line on the site.** They are not case studies (no client, no problem, no result), and "built to convert" is unverifiable agency-speak. A visitor who clicks through and realizes "case studies" = spec demos loses trust — the site's one unforgivable sin given its honesty positioning.
- The featured item is the **toner/office-supplies demo** — off-niche for a trades positioning. The electrical contractor demo is the on-brand lead.
- The honest framing already exists in the intro copy ("The builds below are demos…") but the heading contradicts it. Honesty must lead, not footnote.
- What demos actually prove: taste, speed, mobile quality. Say that: "No fake client logos here. These are demo builds I made for the trades I want to serve — open them on your phone and judge the quality bar yourself."

### 3.5 Pricing/packages — 4.5/10 (biggest missed opportunity)
- Heading says "Three **clear** ways…" but the one thing that would make it clear — a number — is absent, while the quote page openly runs a $500–$1,500 slider. The transparency already exists; it's just hidden one click too deep.
- Tier cards are feature-list clones of every agency's tier cards ("Mobile-friendly design," "Basic SEO setup"). Without prices or timelines they're indistinguishable from the market.
- Fix: add "Most land between $X–$Y" + "Live in ~N weeks" per tier, keep "every project gets a custom quote" as the footnote it deserves to be. This is the single highest-impact change available.

### 3.6 Process — 6/10
Steps are sane (Chat → Plan & quote → Design & build → Launch) but generic — every competitor has the same four boxes. Missing the thing Hatt Digital can uniquely put here: **dates.** "Week 0: a 15-minute call. Within 1 business day: flat quote. Weeks 1–2: build + revisions. Week 2–3: live." The FAQ already promises these numbers; surface them.

### 3.7 Final CTA — 6/10
- **Two buttons with different labels go to the same page** ("Request a Website Quote" + "Start a Website Project" → both quote.html). That's choice noise that also looks template-y. One primary + Call.
- "Call Evan" is the single most human touch on the page — keep it, and let that energy infect the rest.

### 3.8 Footer — 7.5/10
Genuinely good: industry links, area links, phone, email. "44.65° N" is a cute dev flourish — harmless. Missing: Google Business Profile link (when live) and a one-line human sign-off.

### 3.9 Mobile sticky CTA bar — 6.5/10
Right idea; but three buttons where two ("Get Quote," "Start Project") are the same destination. Two buttons — **Call** and **Get Quote** — with bigger tap targets.

### 3.10 What's NOT on the homepage (and should be)
`home.json` contains good sections that are currently **not rendered** by `index.html`:
- `local` ("Your website, built by the person you actually talk to") — the human/Evan section. Its absence is why the homepage feels like an AI-run agency.
- `reviews` — the honest "no fake five-stars, real reviews will live here" stance. Differentiating, currently invisible. (But re-format: placeholder text inside quote-card UI reads as a mock testimonial at a glance — make it one plain honest paragraph instead of fake quote cards saying "Your business here.")
- `faq` — the top questions (cost! time!) belong on the homepage.
- `whyhd` — usable raw material, but cut "Agency quality without the agency runaround" (overclaim + agency-speak).

### 3.11 Other pages (brief)
- **FAQ page — 7.5/10.** The best writing on the site. "I won't promise guaranteed rankings (no honest person can)" and the ownership answer are the brand voice at its best. Steal this tone for the homepage.
- **Quote page — 7.5/10.** Genuinely good UX (package tiles, budget slider, optional-details collapse). Weakness: arrives cold — a price-range on the homepage would make this page confirm rather than reveal.
- **About — 7/10.** Right instincts (founder quote, "Your neighbour, not an agency"). Missing: a photograph of Evan, any concrete biographical fact (town, background, why trades). "They're my community too" is asserted, never shown.
- **Services — 6.5/10.** Solid list, honest tags ("Included," not upsells — good). Same dev-theatre header ("const goal = 'more customers'") problem.
- **Local/industry pages — 5.5/10.** Same 204-line skeleton with the noun swapped (contractors/electricians/plumbers are near-identical). "Halifax is a competitive market…" is filler any city could wear. Thin-content risk for the exact rankings these pages exist to win. Each needs 2–3 genuinely specific blocks (trade-specific FAQ, trade-specific site sections, real area names).

### 3.12 Copy that sounds fake, overclaimed, or agency-template (kill list)
- "Mini case studies, built to convert." (§3.4)
- "Websites that make local businesses impossible to ignore." (schema slogan — overclaim)
- "Agency quality without the agency runaround" (unrendered, but delete from data)
- "Websites that work as hard as you do." (stock)
- "Our goal…" (voice break — there is no "our")
- The fake code everywhere: `rank(local).convert(visits);`, `build(websites).that(convert);`, "compiling" — this is the site talking to itself, not to a customer
- The "No X, no Y, no Z" triad appears 6+ times across pages ("no pressure, no obligation," "no middlemen, no markup, no nonsense," "no jargon, no upsells," "no account managers, no handoffs, no mystery," "no stock photos, no made-up quotes, no fake five-stars"). Once is voice; six times is a tic that pattern-matches to AI writing. Keep the two best, rewrite the rest.
- "Win the mobile moment" (local pages — pure marketing-deck language)

### 3.13 What would make it MORE honest and trustworthy
- A real photo of Evan, name of his town, one human sentence of background.
- Published price ranges and timelines (receipts, not adjectives).
- Own-it-all guarantee stated on the homepage, not just FAQ.
- Demos labelled proudly as demos, with live links and "open it on your phone" challenge.
- Lighthouse/PageSpeed scores of hattdigital.ca and the demos, shown as numbers (a provable claim a zero-client studio can make).
- "I'm a new studio" said out loud once, paired with why that's priced in — this defuses the missing-reviews problem instead of hoping nobody notices.
- Google Business Profile + real reviews as they arrive (the only path from 8 to 9).

---

## 4. Revised homepage structure

1. **Hero (compact, ~70vh, no scroll-jack).** Eyebrow: "Web design · Nova Scotia". New headline + first-person sub (options in §5). Primary CTA "Get a Straight Quote" + secondary "See My Work" + visible phone. Under the CTAs, a **receipts strip**: `Sites from $500 · Live in 1–3 weeks · You own everything · Replies in 1 business day`. Visual: replace the compiler with the before/after slider itself or a real browser-framed shot of the electrician demo. Kill canvas particles on mobile at minimum.
2. **Before/after slider** (kept, reframed as "the standard I build to," less cartoonish before, receipts replacing the filler bullets). If the slider moves into the hero, this slot becomes the demos.
3. **Packages WITH price ranges + timelines.** Heading: "Straight prices, not 'contact us.'" Three tiers, each with "$X–$Y" and "live in ~N weeks," plus the custom-quote footnote.
4. **Demo work, honestly framed.** Electrician demo leads. Heading like "Demo builds — judge the quality bar yourself." Live links, phone challenge.
5. **The Evan section** (rendered `local` + photo). "I'm Evan. I build every site myself, from [town], Nova Scotia. When you call, you get me." + Call button. Merge the 2–3 strongest `whyhd` points as short bullets (direct to builder / flat quote / you own it).
6. **Process with real dates** (Week 0 → live in 2–3 weeks).
7. **Honesty block instead of fake-review carousel:** one plain paragraph ("New studio, real reviews only — as clients wrap up, their words go here verbatim") + the three guarantees (flat quote, 1-business-day replies, you own everything).
8. **Homepage FAQ (4 items):** cost (now answerable with the ranges), timeline, "why not Wix," what happens after I contact you.
9. **Final CTA:** one primary ("Get a Straight Quote") + "Call Evan — 902-277-4424" written out. Delete the duplicate button.

Sections deleted/demoted: full-viewport hero stage, compiler, "Scroll to explore," duplicate CTA buttons, benefit-triad filler.

---

## 5. Copywriting direction

**Voice rules**
- First person singular, always. There is no "we/our" at Hatt Digital.
- Every claim gets a number, a name, or a place — or it gets cut.
- Sentence length: FAQ-page tone site-wide (it's already the best writing on the site).
- Max one "no X, no Y" construction per page.
- Ban list: *built to convert, impossible to ignore, elevate, seamless, empower, unlock, work as hard as you do, win the mobile moment, agency quality, case study* (until there is one).

**Hero headline options** (pick by gut, all pass the "says who?" test):
1. "A website that gets you calls. Built here in Nova Scotia by one person you can actually phone."
2. "Clean, fast websites for Nova Scotia trades — from $500, live in weeks."
3. "Your customers check you out on their phones. Look like the obvious choice."

**Hero sub (matching #1):** "I'm Evan. I build clean, mobile-first websites for contractors and local businesses across Halifax, Dartmouth and the South Shore — flat quote up front, live in one to three weeks, and you own every piece of it."

**Pricing intro rewrite:** "Nobody around here puts prices on the page. Here's mine: most Starter sites land between $500–$800, most Business sites $900–$1,500, and bigger builds get quoted by scope. Your quote is flat — the number we agree on is the number you pay."

**Demos intro rewrite:** "No borrowed logos, no invented testimonials. These are demo sites I built for the trades I want to work with. Open one on your phone — that's the quality bar for your project."

**Local pages:** each needs trade-specific substance, e.g. plumbers: "Emergency call-outs need a phone number above the fold, not a contact form. Here's the site structure I build for plumbing companies: services by urgency, service-area map, licence and insurance line, and a 'call now' that follows the thumb." Write once per trade; no shared skeleton sentences.

---

## 6. Visual/design direction

Keep: navy/cyan palette (matches logo, differentiated locally), Inter/Inter Tight, card quality, button system, mobile sticky bar concept.

Change:
1. **Retire the developer-theatre motif.** Compiler, code editors with fake code, terminal chrome on section headers, "compiling" status — replace with browser-frame mockups of *actual* demo builds (the `ba-browser` component already does this well). JetBrains Mono survives only as small eyebrow labels, not as content.
2. **Add exactly one photograph: Evan.** The site currently contains zero humans and zero Nova Scotia. One good portrait fixes the first; place-name copy fixes the second. (Optional later: real NS texture — a shot of a work van, a harbour — but the portrait is the non-negotiable.)
3. **Break the band monotony.** Every section is `padding:96px` + eyebrow + H2 + one-sentence intro + grid of cards. Vary: tighten receipts strip (~48px), let the Evan section be asymmetric (photo left, text right), let the FAQ be plain text without cards. Rhythm = contrast, not uniform air.
4. **Contrast/punch:** the pricing section should be the visually loudest light section (it's the differentiator); the Evan section the warmest. Currently every section shouts at the same volume with the same glow-gradient card language — which is precisely the "AI template" look.
5. **Mobile performance pass:** no canvas on mobile, no 100vh scroll-jacked stage, keep the sticky call bar (2 buttons), verify Lighthouse mobile ≥ 95 — then publish the score as proof.

---

## 7. Priority fix list (highest impact → lowest)

1. **Publish price ranges + timelines in the packages section.** (Copy-only; the market-wide gap.)
2. **Rewrite the hero:** new headline, first-person sub, receipts strip, "Get a Straight Quote" CTA.
3. **Rename/reframe the portfolio:** kill "Mini case studies, built to convert," lead with the electrician demo, honest demo framing.
4. **Add the Evan section with a real photo** (render the existing `local` data, upgraded).
5. **Retire the compiler/fake-code motif** on the homepage hero (then all page headers).
6. **Unify CTAs:** one label ("Get a Straight Quote" / "Get a Quote") everywhere; fix final-CTA duplicate buttons; mobile bar to 2 buttons.
7. **Process section gets real dates.**
8. **Homepage FAQ (4 items) + honesty/guarantees block** replacing nothing (net-new sections).
9. **Before/after reframe** (label, less-cartoon "before," receipts under it).
10. **Local/industry pages de-duplicated** with trade-specific content.
11. **Voice pass site-wide:** kill "our," prune "no X, no Y" tics, apply ban list, fix schema slogan.
12. **Performance/mobile pass** + publish Lighthouse scores as a trust signal.

## 8. Implementation plan to 9/10

**Phase 1 — Copy & data only (1 day).** Items 1, 2 (copy part), 3 (copy part), 6, 7, 11. Almost everything lives in `_data/*.json`; zero layout risk. *Expected: 6 → 7.*

**Phase 2 — Structure (2–3 days).** Items 4, 8, and rendering changes: compact hero, receipts strip, section order per §4, final-CTA cleanup, mobile bar. Needs one portrait photo of Evan. *Expected: 7 → 8.*

**Phase 3 — Visual pass (2–3 days).** Items 5, 9, 12: de-theatre all page headers, band rhythm/contrast work, mobile perf, Lighthouse receipts. Local pages (item 10) written one trade at a time. *Expected: solid 8, best-in-market locally.*

**Phase 4 — Proof engine (ongoing; the only road to 9).** No copy rewrite reaches 9/10 without external proof. Concretely: land 1–2 real local clients (discounted "founding client" rate in exchange for a named review + permission to show the before/after), stand up the Google Business Profile and route reviews to it, replace one demo slot with the first real project, swap the honesty block's promise for the first verbatim review. When the before/after slider shows a *real* Nova Scotia business, the whole site's honesty positioning locks in — that's the 9/10 moment.

**Guardrail for every future edit:** would a skeptical Dartmouth contractor reading this on a phone believe it, and could Evan defend it face-to-face? If not, cut it.
