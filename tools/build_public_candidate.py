#!/usr/bin/env python3
"""Build a restricted public HTML candidate from the private master.

This is intentionally a *candidate*, not a deployable release. The original
app.js contains restricted content and must not be shipped with the output.
"""
from pathlib import Path
import re
import sys

source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("index.html")
destination = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("dist-public/index.html")
html = source.read_text(encoding="utf-8")
start = '<section id="chapter3"'
end = '<section id="consult"'
assert html.count(start) == 1 and html.count(end) == 1, "Unexpected lesson boundaries"
a, b = html.index(start), html.index(end)
assert a < b
html = html[:a] + html[b:]
# Remove the full-course application bundle: it embeds restricted lessons,
# assessment banks and routing. A separately audited public bundle is required.
html, n = re.subn(r'<script\s+src="app\.js[^"]*"\s+defer></script>', '', html)
assert n == 1, "Expected one full-course app.js reference"
# Fail closed rather than distributing broken free lessons or leaking course data.
for token in ('<section id="chapter3"', '<section id="chapter13"', 'app.js?v='):
    assert token not in html, f"Restricted marker remains: {token}"
assert '<section id="chapter2"' in html and '<section id="home"' in html
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text(html, encoding="utf-8")
print(f"Candidate written: {destination}")
print("NOT DEPLOYABLE: public JS, navigation, and all other assets still require audit.")
