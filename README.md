# CCC, Chris Maier

Client folder for Contractors, Closers &amp; Connections. Chris Maier is National
President and Founder. CCC runs invitation only commercial real estate events
across twenty chapters. Chris runs the network nationally, so **treat Atlanta as
one market among many rather than the default one.** Most of what gets built here
ships to other cities.

## What is in here

```
BRAND.md                              canonical values. Palette, type, specs, rules.
brand/      ccc-brand-package.html    the same system, presented for Chris to look at
templates/  00-index.html             live preview of all twelve
            newsletter/               the quarterly
            correspondence/           five short note layouts
            events/                   six templates covering the event cycle
            fill-mock.mjs             regenerates every -preview from its -template
assets/     img/                      the images, and a git remote to the host repo
reference/  ccc-homepage-...pdf       site capture, compressed
source/                               original photographs before cropping
HANDOFF.md                            project log, decisions and open items
```

Open `templates/00-index.html` in a browser to see everything at once. Read
`BRAND.md` before changing any value: it is the source of truth, and the HTML
package and the templates both follow it rather than the other way round.

## The two things to know before editing anything

**Images are hosted, not attached.** Every image in every template points at
`https://nolanbowlin.github.io/ccc-chris-maier/assets/img/`, which is the `assets/`
folder in this directory pushed to GitHub and served by GitHub Pages. Editing an
image locally does nothing until it is committed and pushed. Never overwrite a
file that has already gone out in a send, because mail already delivered cannot
be repaired. Add a new filename instead.

**Tokens in double braces are the fill in the blanks.** `{{EVENT_NAME}}`,
`{{FIRST_NAME}}`, `{{VENUE_NAME}}` and so on. Two of them are set once for the
whole suite rather than per send:

| Token | What it is |
|---|---|
| `{{CHRIS_EMAIL}}` | The address in the `mailto:` href. Still unconfirmed. |
| `{{CHRIS_EMAIL_DISPLAY}}` | The visible text of the same address, with `@` written as `&#64;` |

A find and replace across `templates/` sets both everywhere.

## Two versions of every template

Each one sits beside its pair in the same folder:

```
corr-01-logo-band-template.html   the working file, with {{TOKENS}}
corr-01-logo-band-preview.html    the same thing filled in, for approval
```

The template is the master. The preview shows real CCC content in the design, so
Chris sees his own events rather than a wall of braces.

```bash
cd templates && node fill-mock.mjs
```

Regenerates every preview. Run it after any layout change, otherwise the two
drift. Content for the previews lives in the `FILES` map at the top of that
script, never in the generated files, and a preview edited by hand is lost on the
next run.

## Publishing an asset

Drop the file in , then commit and push this repo. Live within a
minute at the base URL plus the filename. There is no separate image repo.

## Rules that carry over from the rest of this workspace

- **No em dashes.** Anywhere. Template copy, comments, commit messages.
- **Raw canonical URLs only.** Never paste a link copied out of Gmail. Those carry
  a `google.com/url?q=` wrapper that breaks tracking and reads as phishing.
- **Tables for email layout.** Outlook renders with Word's engine, so flexbox and
  grid collapse to an unstyled column.
