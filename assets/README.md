# CCC Brand Assets

Image host for Contractors, Closers &amp; Connections email templates.
Every logo and photograph referenced by a CCC email lives here and is served
over HTTPS by GitHub Pages.

**Base URL**

```
https://nolanbowlin.github.io/ccc-chris-maier/assets/img/
```

Reference an asset by filename appended to that base, for example
`https://nolanbowlin.github.io/ccc-chris-maier/assets/img/ccc-logo.png`.

## Why a repo and not an attachment

Email clients do not render local files. Every image in an HTML email has to
be a public URL that stays reachable for as long as the mail exists in
someone's inbox, which is forever. Hosting them here means the CCC templates
never depend on Wix, Luma, Google Drive, or a Dropbox share link that expires.

## Rules

- **Never overwrite a file that has already shipped in an email.** GitHub Pages
  caches aggressively and mail already delivered cannot be repaired. To change
  an image, add a new filename and point new sends at it.
- **Keep source files out.** Only web-ready, compressed derivatives belong here.
  Originals stay in the client folder.
- **Photographs are cropped to fixed sizes.** Heroes are 1200x480. Recap grid
  photos are 560x400. Keep new additions to those sizes so templates stay
  drop-in.

## Contents

| File | Size | Use |
|---|---|---|
| `ccc-logo.png` | 900w, transparent | Full horizontal logo for white or light backgrounds |
| `ccc-logo-reversed.png` | 900w, transparent | White and orange logo for charcoal or black backgrounds |
| `ccc-mark.png` | 480 square | C mark only, light backgrounds |
| `ccc-mark-reversed.png` | 480 square | C mark only, dark backgrounds |
| `hero-ccc-event-*.jpg` | 1200x480 | Email hero banners |
| `photo-ccc-event-*.jpg` | 560x400 | Recap and gallery grids |

Photography is CCC's own event coverage from the Atlanta chapter.

## When CCC gets its own host

Swap the base URL in one place: the `Asset base URL` row of the brand package
in the client folder. Nothing else in the templates hard-codes a host beyond
that string, so a find and replace across the template folder is the whole
migration.
