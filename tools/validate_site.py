"""Checks run before every deploy."""
import re
from pathlib import Path
from urllib.parse import urlparse

root = Path(__file__).resolve().parents[1]
site = root / 'site'

AUDIO = {'.wav', '.mp3', '.flac', '.aif', '.aiff', '.m4a', '.ogg', '.opus', '.wma', '.aac'}
# Every outside address must be added here on purpose.
ALLOWED_HOSTS = {
    'slowthdoom.github.io', 'coochilla.github.io', 'craneiumband.bandcamp.com',
    'icaptain.bandcamp.com', 'tuonelamagazine.com', 'www.skraeckoedlan.com',
}
errors = []

for path in root.rglob('*'):
    if '.git' not in path.parts and path.suffix.lower() in AUDIO:
        errors.append(f'audio file in a public repository: {path.relative_to(root)}')

html = (site / 'index.html').read_text()
pages = html + (root / 'tools' / 'one-sheet.html').read_text()
for url in re.findall(r'(?:href|src|content)="(https?://[^"]+)"', pages):
    if urlparse(url).hostname not in ALLOWED_HOSTS:
        errors.append(f'link to an unapproved site: {url}')

refs = re.findall(r'(?:href|src|data-download)="([^"]+)"', html)
refs += re.findall(r'url\("([^"]+)"\)', (site / 'style.css').read_text())
for ref in refs:
    if not re.match(r'https?:|mailto:|#|data:', ref) and not (site / ref).is_file():
        errors.append(f'missing file: {ref}')

ids = set(re.findall(r'\bid="([^"]+)"', html))
for anchor in re.findall(r'href="#([^"]+)"', html) + re.findall(r'data-copy="([^"]+)"', html):
    if anchor not in ids:
        errors.append(f'missing section: #{anchor}')

if errors:
    raise SystemExit('\n'.join(errors))
print('Site validated: no audio, approved links only, all files present.')
