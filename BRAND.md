# CCC brand package

Contractors, Closers &amp; Connections. Colour values sampled out of the logo PNG
rather than eyeballed from a screenshot. Components derived from the live site,
captured 19 August 2026, copy in `reference/`.

**This file is canonical for values.** `brand/ccc-brand-package.html` is the same
system presented for Chris to look at. If a hex, size or URL changes, change it
here first, then in the HTML, then in `templates/`.

Use this for anything built for CCC or Chris Maier: email, landing pages, decks,
one pagers, event collateral.

---

## Colour

| Token | Hex | Where it is used |
|---|---|---|
| CCC orange | `#EE7700` | Buttons, section markers, rules, links, key figures. The one accent. Sampled from the logo. |
| Orange deep | `#C85F00` | Link text on white where full orange fails contrast. Button borders. |
| CCC charcoal | `#333333` | Headings, dark panels, title bars. The logo's own grey, sampled. |
| Charcoal deep | `#252525` | Event detail panels, speaker grids, anything that recedes behind charcoal. |
| Ink | `#111111` | Top strip and footer only. The frame around the message. |
| Paper | `#FFFFFF` | Body background. Most of an email is this. |
| Shell | `#F4F4F4` | Outside the 600px column, and quiet inset cards. |
| Body text | `#4A4A4A` | Paragraph copy on white. Not pure black, which reads harsh at 15px. |
| Muted | `#8A8A8A` | Captions, roles, dates, legal line. |
| Hairline | `#E2E2E2` | Dividers. One pixel, never a shadow. |
| Panel text | `#C9C9C9` | Body copy inside charcoal panels. |

**One accent, permanently.** Orange is a signal, not a surface. Every sponsor logo
in a CCC email brings its own colour already. A second accent turns a branded send
into a bought template. When a second surface is needed, use charcoal.

**Never put the logo on orange.** The orange ring disappears into the field.

---

## Type

The site loads **Allerta** from Google Fonts. Email cannot rely on a webfont, so
the stack lists it first and falls back:

```
'Allerta','Segoe UI',Arial,Helvetica,sans-serif
```

with `@import url('https://fonts.googleapis.com/css2?family=Allerta&display=swap');`
in the `<style>` block. Apple Mail and iOS render the real face. Outlook and Gmail
fall back cleanly, which is the point: relying on the webfont alone drops those
clients to a default serif, and Times New Roman on white is the current problem.

| Role | Size / weight | Treatment |
|---|---|---|
| Display heading | 28px / 800 | Uppercase, letter-spacing -0.2px, charcoal |
| Section heading | 20px / 800 | Uppercase, letter-spacing 0.4px, charcoal |
| Section marker | 12px / 800 | Uppercase, letter-spacing 2px, orange, with an 11px square bullet |
| Body | 15px / 400, line-height 1.7 | `#4A4A4A` |
| Small print | 12px / 400, line-height 1.6 | `#8A8A8A` |
| Button label | 14px / 800 | Uppercase, letter-spacing 1.5px, white on orange |
| Panel key | 13px / 800 | Uppercase, letter-spacing 2px, orange |

---

## Logo

Base URL for every asset. **Interim arrangement:** this is a Nolan Scott Team
GitHub account, not one CCC controls. Move it to a repo or CDN CCC owns before
this runs at volume, because if that account lapses every image in every already
delivered CCC email breaks at once.

```
https://nolanbowlin.github.io/ccc-brand-assets/img/
```

| Placement | File | Rendered width |
|---|---|---|
| Email header band, white | `ccc-logo.png` | 200px |
| Email footer, ink background | `ccc-logo-reversed.png` | 150 to 180px |
| Compact header, single line | `ccc-mark.png` | 36px |
| Dark panel watermark | `ccc-mark-reversed.png` | 40px |

The reversed file is not the colour logo with a filter over it. The charcoal is
knocked out to white while the orange holds, which is what keeps the inner ring
readable on a dark panel.

Clear space equal to the height of the C mark on every side. In email that is at
least 20px of padding inside the logo band.

---

## Photography

| Purpose | Crop | Naming |
|---|---|---|
| Email hero banner | 1200 x 480 | `hero-*.jpg` |
| Recap and gallery grid | 560 x 400 | `photo-*.jpg` |
| Portrait, founder letter, split layout | 400 x 500 | `chris-maier-*.jpg` |
| Signature headshot | 400 and 260 square | `chris-maier-headshot.jpg`, `-sm.jpg` |
| Speaker card, upcoming | 260 x 342, colour | `speaker-*.jpg` |
| Speaker card, past archive | 260 x 342, greyscale | `speaker-*-mono.jpg`. The site uses colour for an upcoming lineup and greyscale for past speakers. Keep that split. |
| Sponsor logo | 240 x 100 on a white card | `sponsor-*.jpg`. Trim the white margin, then recentre, so marks sit consistently. Never on orange, never on bare grey. |

**Crop from the centre, never by saliency.** An automatic attention crop finds the
highest contrast face and zooms to it, which on a 2.5:1 hero throws away the room
and leaves two heads at a bar. A centre crop trims top and bottom only. The room
is the subject in event photography, so keep it.

For the founder letter use `chris-maier-speaking.jpg` rather than the studio
headshot. It shows him doing the thing the network is built around.

Never paste full resolution camera files into a recap. Gmail clips a message over
roughly 102KB of HTML and hides the tail behind a "view entire message" link,
which is exactly where the next event date sits.

---

## Components

| Component | Spec |
|---|---|
| Orange rule | 5px, full width, directly under the logo band. The thing that identifies a CCC email in a preview pane. |
| Primary button | Table cell, `bgcolor="#EE7700"`, 18 to 20px padding, white uppercase label, square corners. One per email. |
| Detail panel | `#252525` ground, orange uppercase key, white bold value. Every event email carries one. |
| Section marker | 11px orange square, 10px gap, then the label in orange caps at 12px / 800 / 2px tracking. |
| Title bar | `#333333` ground, orange eyebrow at 10px, white display heading, grey standfirst. |
| Top strip | `#111111` ground, orange 10px uppercase line, 1.6px tracking. |
| Diagonal corners | Orange triangles at opposing corners of a dark panel. Decoration only in email: needs background images, so it degrades to a plain charcoal panel in Outlook. |

---

## Copy already in the wild

Photographed off the event banner, so these are CCC's own words:

- **"Commercial Real Estate &amp; Construction Networking Reimagined"** is the positioning line.
- **"Making Business Personal"** is the tagline.
- The site top strip runs "a national business forum hosting private events and
  summit series for the commercial real estate industry," which is what the
  templates use in the black strip above the logo.

Nolan's own CCC member update closes with "Making Business Happen." That is not
the same line. If it was meant to be, one of the two is wrong and Chris is the one
to ask.

---

## Signature

| Field | Value |
|---|---|
| Name | Chris Maier |
| Title | National President &amp; Founder |
| Organisation | Contractors, Closers &amp; Connections (CCC) |
| Phone | (404) 229-0492 |
| Web | `www.contractorsclosersconnections.com` |
| Email | chris&#64;contractorsclosersconnections.com, confirmed |
| Social | LinkedIn, YouTube |

Chapters, in the order CCC lists them: Atlanta, New York City, New Jersey, Tampa,
Orlando, Miami, Dallas, Fort Worth, Phoenix, Greenville, Charlotte, Raleigh,
Washington DC, Kansas City, Northwest Arkansas, Savannah, Nashville, Boston,
Nebraska, Beverly Hills.

**Title is frozen at the long version.** Chris's own sends drift: July used
"President &amp; Founder" with thirteen chapters, later ones use "National
President &amp; Founder" with twenty. If he prefers the short one, change all
eleven templates at once, not gradually.

**Signature URL is the national root, not the Atlanta subdomain.** Chris runs the
chapters nationally and most sends go to other markets. Atlanta is his home
chapter, not the default.

---

## Voice

The audience is senior: principals, CEOs, developers, brokers with their own deal
flow. They get invited to everything. Answer three questions in the first screen
or the email gets archived.

1. **What is it.** Named event, one line on who is in the room.
2. **When and where.** In the detail panel, not buried in a paragraph.
3. **What do I do now.** One button.

Rules:

- No em dashes. Commas, periods, or rewrite the sentence.
- No filler openers. Never "I hope this email finds you well."
- Name the room, not the concept. "Senior CRE executives across multifamily,
  industrial and hospitality" beats "industry leaders."
- Say the ask once, plainly. "Reply yes and I will hold your seat" outperforms
  three paragraphs of build up.
- Short correspondence stays under 120 words. Longer than that and it is an event
  email pretending to be a note.
- Speaker names carry title then firm on the next line, in that order, every time.

The existing short sends are written fine. The problem is the packaging, not the
prose. The templates keep the plain speech and put a frame around it.

---

## Email build rules

| Rule | Why |
|---|---|
| Tables for layout, never flexbox or grid | Outlook renders with Word's engine. Modern layout collapses to an unstyled column. |
| Inline styles on everything load bearing | Gmail strips most of a `<style>` block. |
| 600px fixed width | Widest column that fits every desktop preview pane without horizontal scroll. |
| Every image carries `alt` and an explicit `width` | Roughly half of recipients see the message with images off first. |
| No background images for anything load bearing | Outlook ignores most of them. Decoration only. |
| Buttons are table cells with `bgcolor`, not styled links | A padded `<a>` renders as bare text in Outlook. |
| `@` encoded as `&#64;` in visible addresses | Some proxies rewrite raw addresses into an obfuscation script that renders as "[email protected]". |
| Raw canonical URLs only | Never paste a link copied out of Gmail. Those carry a `google.com/url?q=` wrapper that breaks tracking and reads as phishing. |
| Every image on the GitHub Pages host | Mail lives in inboxes indefinitely. An image on a platform CCC does not control becomes a broken box the day that platform changes. |
| Keep a send under about 100KB of HTML | Gmail clips past roughly 102KB and hides the tail behind a link. Current largest template is 33KB. |

---

## Tokens

Everything editable is in double braces. Two are set once for the whole suite
rather than per send:

| Token | What it is |
|---|---|
| `{{CHRIS_EMAIL}}` | The address in the `mailto:` href. Confirmed as chris&#64;contractorsclosersconnections.com |
| `{{CHRIS_EMAIL_DISPLAY}}` | The visible text of the same address, `@` written as `&#64;` |

`{{FIRST_NAME}}` is a stand in for whatever merge field the sending platform uses,
not a literal. `{{CHAPTER_CITY}}` names the market a given send is going to.
