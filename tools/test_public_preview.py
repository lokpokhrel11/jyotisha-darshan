#!/usr/bin/env python3
"""Static checks for the isolated, staging-only public course preview."""
from pathlib import Path
import re
html=Path('public-preview.html').read_text(encoding='utf-8')
js=Path('public-preview.js').read_text(encoding='utf-8')
course=Path('public-course.html').read_text(encoding='utf-8')
assert '<section id="chapter2"' in html
assert '<section id="chapter3"' not in html
assert '<section id="chapter13"' not in html
assert 'src="app.js' not in html
assert 'src="public-preview.js"' in html
assert 'renderChapter2Exam' in js
assert 'renderQuestion' in js
assert 'chapter3Bank' not in js
assert not re.search(r'chapter(?:[3-9]|1[0-3])\\b',js)
assert 'public-course.html' in html
assert 'public-preview.html?chapter=1' in course
assert 'public-preview.html?chapter=2' in course
ids=set(re.findall(r'\\bid="([^"]+)"',html))
used=set(re.findall(r"\\$\\('([^']+)'\\)",js))
assert not (used-ids), f'Missing elements: {sorted(used-ids)}'
assert 'href="index.html?chapter=4' not in html
print('Static staging checks passed. Browser and history audits are still required.')
