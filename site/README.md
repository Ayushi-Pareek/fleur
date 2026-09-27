# Fleur — Website Design Prototype

A browsable design prototype of the full Fleur site. Open `index.html` in any browser to review. No build step, no dependencies.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — art sections + two-door "Learn" panel (no maker prices) |
| `shop.html` | Available works — **art only** (sculptures → statement piece), Sold and Coming-February states, single doorway line to the Method |
| `product.html` | Product detail template — spec list, care, shipping, "add" wiring point |
| `method.html` | **The Fleur Method** — premium teaching tier: recorded classes ($145), in-person workshops (letter CTA), Rose Stem Kit ($42); closing band redirects to Print & Make by time framing |
| `printables.html` | **Print & Make** — the artist's experiments: one unified shelf (flowers, plants, cards, journals) with a category filter (Everything / Flowers & Plants / Cards & Journals), shared "what you'll need" strip (A4 paper ~100 gsm), CTA band up to the Method |
| `pattern-rose.html` | **Pattern detail page** — The Rose Pattern: story ("Why this experiment"), spec list, download CTA, zoomable image gallery |
| `experiment-cards.html` | **Cards That Pop** — FREE experiment: email-gated download (email → joins The Studio Letter → PDF by email), story section, gallery |
| `experiment-journal.html` | **The Aged-Paper Journal** — FREE experiment: coffee/tea-aged printables, email-gated download, story section |
| `experiment-succulents.html` | **Paper Succulents** — coming soon, $12 planned: story-so-far, join-letter CTA |
| `experiment-hellebore.html` | **The Hellebore Pattern** — coming February, $18 planned: studies gallery, join-letter CTA |
| `experiment-garden.html` | **The Paper Garden Set** — coming spring, $24 planned: join-letter CTA |
| `commissions.html` | The dark section, 4-step process, enquiry form |
| `about.html` | Ayushi's story — Pune named plainly here, per the provenance strategy |
| `journal.html` | Journal index — six entries across process / inspiration / interiors |
| `journal-rose.html` | Sample article — shows the reading experience (drop cap, pull quote) |

## Site architecture (tier separation)

Three tiers, deliberately walled — segmented by **time commitment**, never by quality:

1. **Art (collect)** — `shop.html`, `product.html`, `commissions.html`. No maker price ever appears here beyond one doorway line on the shop ("Learn the Technique").
2. **The Fleur Method (learn)** — `method.html`. Premium teaching of the real technique; framed as authority; honestly labelled "weeks of practice".
3. **Print & Make (make)** — `printables.html`. "Make something this afternoon"; the artist's wind-down practice — one unified experiments shelf (flowers included) with a category filter; openly credited to the studio.

Links between tiers 2 and 3 run **both ways, framed by time only**: the Method's closing band says "Short on time? Make something in an afternoon"; Print & Make's closing band says "When an afternoon stops being enough." Tier 1 keeps its single downward doorway line. Homepage carries no maker prices — the Learn section is a two-door panel (now also reachable via the **Print & Make** nav item). Maker prices live only on `method.html` and `printables.html`. Rationale: price proximity (an $18 printable next to a $980 sculpture) anchors the art down; separation of display is not concealment — everything is public, labelled, and linked in the footer.

### Honest process (living-study correction)

The site never claims works are made "from living study" or "from life." The truthful story, used throughout: every piece begins with the plant — held, taken apart, and photographed petal by petal — because a sculpture can take two weeks and a rose lasts four days. The studio makes its own references that outlast the bloom. Copy says "the studio's own studies of the plant" / "studied and photographed at the worktable." Sole exception: the workshops card may say "living study on the bench" because workshops genuinely have live stems on the table.

## Design system

- Palette and roles per `../brand-colors.md` (CSS variables at the top of `css/styles.css`). Contrast notes: `--mushroom` darkened to `#5F5850`, `--ink-soft` raised to 82% alpha, `--clay-deep` added for text/hover-safe clay, stone-section text overrides — all text now passes WCAG AA at its rendered size.
- Type: **Playfair Display** (serif — headings and all serif roles) + **Source Sans Pro** (sans — all text, loaded as "Source Sans 3", the current Google Fonts name for the family), Google Fonts with serif/sans fallbacks. Two text sizes only outside headings: **17px** reading text and **13px** labels (nav, buttons, eyebrows, meta).
- Photography: stock images from Unsplash (hot-linked) inside `.ph` blocks, each with `onerror="this.remove()"` so a failed image degrades to the palette-toned gradient block. Swap for real product photography by replacing the `img src` values — the layout does not change.
- Hand-drawn line icons sit atop the four homepage "why" blocks, drawn to match the SVG motif style (stroke 2.4, round caps, currentColor).

## Deliberately stubbed (wired at real build)

- **Checkout** — "Add to Collection" / "Browse" / "Download" buttons show a toast; real build connects Razorpay (India) or Shopify. Product pages carry price, spec, and shipping copy ready for a buy button.
- **Forms** — Collector's List and commission enquiry show thank-you states locally; real build connects to your email tool (Flodesk, Mailchimp, etc.) and inbox.
- **Journal links** — all entries point at the one sample article.
- **Shop filters** — visual only.
- **Geo-currency** — `js/currency.js` is display-level only: timezone detection (Europe → EUR, Asia/Kolkata → INR, else USD), `?currency=` override for testing, hardcoded prototype rates (EUR 0.92, INR 83.5). Real build should use IP geolocation + live FX API and price rules per market.

## To review well

Look at it at phone width too (resize the browser) — the nav collapses, grids stack. Sections to feel: the dark Commissions inversion, the Stone Learn panel, and the Collection cards.

## Notes

- The mailing list is named **The Studio Letter** (was "Collector's List"). The anchor id `#collectors-list` is kept for link stability. Cadence, as stated on the page: **one letter a month**, covering both new works and new experiments. Future (at unsubscribe-page design): per-topic opt-outs — e.g. stay on art releases but leave experiments, or vice versa.
- **Print & Make shelf policy:** nothing is ever removed. Finished experiments stay available indefinitely — as PDFs, written instructions, or videos — as a record of the studio's play. Free items are email-gated: the download arrives by joining The Studio Letter (list growth + signals buyers). The shelf filter combines category (Flowers & Plants / Cards & Journals) with price (Free / Paid).
- Every Print & Make card links to a detail page with a "Why this experiment" story section (placeholder copy in the artist's voice — to be rewritten by her: why it was made, what was learned, what's next, where it lives at home).
- The collection is named **"The Collection"** — no series name in headings; individual works keep their own names (Rose No. 1, etc.). Future series slot in without re-titling pages.
- Prices are placeholders in USD per your call; adjust in the HTML. They display in the visitor's currency via `js/currency.js`.
- The wordmark is type-only ("FLEUR.") — a drawn logo can replace it later without layout changes.
- Contact email and Instagram links are placeholders (`hello@fleur.studio`).
