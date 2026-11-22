# Slowth press kit

The electronic press kit (EPK) of Slowth, for record labels, promoters, festivals and press:
https://slowthdoom.github.io/

Every push to `main` validates and publishes the `site/` folder. Nothing else is deployed.

## Editing

| To change | Edit |
| --- | --- |
| Text, sections, release plan, gigs, bios, contact | `site/index.html` |
| Colours and layout | `site/style.css` (colours are at the top) |
| Photos | `site/assets/photos/` (web) and `site/assets/press/` (downloads) |
| Tech rider | `tools/tech-rider.html`, then rebuild `site/assets/slowth-tech-rider.pdf` |
| Printable one-sheet | `tools/one-sheet.html`, then rebuild the PDF |
| Link-preview image | `tools/share-image.html` (1200 x 630) |
| Logo | see "Logo" below |

The release plan and contact address appear on both the page and the one-sheet: change both.
The page is written in normal case and displayed in lowercase by CSS. The bio stays in normal
case so it pastes correctly, and must be identical on the page and the one-sheet.

## Logo

All logo files are made from the band's original artwork (not in this repo):

- `site/assets/slowth-badge.jpg` is the sloth from the band's sloth badge, cut out without its frame,
  with the badge's grey background recoloured to the page black (`#08060c`). In `site/style.css` its
  width is `44vw - var(--gutter)`, so it ends where the hero photo starts; genre and city are centred
  under it at the same width.
- `site/assets/favicon.png` (64 px, browser tab) and `site/assets/apple-touch-icon.png` (180 px,
  phone bookmarks) are the whole sloth badge, with its white margin removed.
- The one-sheet uses the same sloth art (`site/assets/slowth-badge.jpg`), centred above genre, city
  and members.
- `tools/slowth-logo-print.png` is the Slowth wordmark as a transparent PNG, used by the tech rider
  and the link-preview image. It is not published on the site.

If the artwork changes, remake these files, rebuild both PDFs and the link-preview image, and update
the `?v=` values.

## Gigs

In the `gigs` table in `site/index.html`, replace a row's three `TBA` cells with date, venue and
city, and remove `class="tba"` from each cell you fill in. Copy a row to add another gig.

## Merch

The `merch` section has four slides and four thumbnails. For each picture, replace a `merch-slide pending`
box with `<img class="merch-slide" src="..." alt="...">`, remove `pending` from its thumbnail button and
put a small copy of the image inside it.

## Member band photos

Put the photo in `site/assets/bands/`, replace that member's `pending` block in
`site/index.html` with an `<img class="project-photo">`, and fill in the venue, city and year.

## Tone

Plain facts. No slogans.

## Rebuilding the one-sheet (macOS)

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --allow-file-access-from-files --no-pdf-header-footer \
  --print-to-pdf="$PWD/site/assets/slowth-one-sheet.pdf" "file://$PWD/tools/one-sheet.html"
```

## Rebuilding the tech rider (macOS)

Stage left and right are from the performers' perspective. The plot is drawn from front of
house, so stage right is on the left of the page.

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --no-pdf-header-footer \
  --print-to-pdf="$PWD/site/assets/slowth-tech-rider.pdf" "file://$PWD/tools/tech-rider.html"
```

## Rules

- **No audio in this repository.** It is public, and so is its history. The demos are
  streamed from Samply. The validator and `.gitignore` both block audio files.
- A new outside link has to be added to `ALLOWED_HOSTS` in `tools/validate_site.py`.
- Remove camera metadata from photos before adding them.
- Press photos of Slowth are credited to Viljami Eronen. Keep the credit next to them.
- The 2023 Coochilla photo at Bar Loose is by Marko Nevanperä. Each band photo carries its own credit.
- After changing a CSS, JS, PDF or image file that keeps its name, update its `?v=` in
  `site/index.html` so nobody gets a cached copy.
- No analytics, cookies, external fonts or third-party scripts of our own. The one exception is
  the Samply player, which is an iframe and runs under Samply's own terms.
- The Samply player is public, without a password, by the band's decision. Keep the
  "demo versions / raw pre-mix and pre-master" label next to it until the files are final.
  Never add `?si=` to a Samply link (it is an account ID). The only query allowed is the
  player colour, `?color=3b0d63` (the plum of the crew band).

Run `python3 tools/validate_site.py` before pushing.
