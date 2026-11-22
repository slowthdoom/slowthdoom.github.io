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
| Printable one-sheet | `tools/one-sheet.html`, then rebuild the PDF |
| Link-preview image | `tools/share-image.html` (1200 x 630) |

The release plan and contact address appear on both the page and the one-sheet: change both.
The page is written in normal case and displayed in lowercase by CSS. The bio stays in normal
case so it pastes correctly, and must be identical on the page and the one-sheet.

## Gigs

In the `gigs` table in `site/index.html`, replace a row's three `TBA` cells with date, venue and
city, and remove `class="tba"` from each cell you fill in. Copy a row to add another gig.

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
  Never add `?si=` to a Samply link (it is an account ID).

Run `python3 tools/validate_site.py` before pushing.
