# Slowth press kit

The electronic press kit (EPK) of Slowth, for record labels, promoters, festivals and press:
https://slowthdoom.github.io/

Every push to `main` validates and publishes the `site/` folder. Nothing else is deployed.

## Editing

| To change | Edit |
| --- | --- |
| Text, sections, release plan, bios, contact | `site/index.html` |
| Colours and layout | `site/style.css` (colours are at the top) |
| Photos | `site/assets/photos/` (web) and `site/assets/press/` (downloads) |
| Printable one-sheet | `tools/one-sheet.html`, then rebuild the PDF |
| Link-preview image | `tools/share-image.html` (1200 x 630) |

The release plan and contact address appear on both the page and the one-sheet: change both.
The page is written in normal case and displayed in lowercase by CSS. Bios stay in normal
case so they paste correctly.

## Rebuilding the one-sheet (macOS)

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --allow-file-access-from-files --no-pdf-header-footer \
  --print-to-pdf="$PWD/site/assets/slowth-one-sheet.pdf" "file://$PWD/tools/one-sheet.html"
```

## Rules

- **No audio in this repository.** It is public, and so is its history. Share private
  listening links by email. The validator and `.gitignore` both block audio files.
- A new outside link has to be added to `ALLOWED_HOSTS` in `tools/validate_site.py`.
- Remove camera metadata from photos before adding them.
- No analytics, cookies, external fonts or third-party scripts.

Run `python3 tools/validate_site.py` before pushing.
