#!/usr/bin/env python3
"""Check the final export against its allowlist and the private lesson sources."""
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import parse_qs, urlsplit

from build_public_candidate import FILES

RESTRICTED = re.compile(r'\bchapter(?:[3-9]|1[0-3])(?:\b|(?=Exam|Bank))', re.I)
PRIVATE_START = '<section id="chapter3"'
PRIVATE_END = '<section id="consult"'


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        self.links.extend(attrs[k] for k in ('href', 'src', 'action', 'poster') if k in attrs)


def normalized(text):
    return ' '.join(text.split())


def audit(directory, master):
    assert {p.name for p in directory.iterdir()} == FILES.keys(), 'Unexpected distribution files'
    contents = {}
    for p in directory.iterdir():
        assert p.is_file() and not p.is_symlink(), p.name
        contents[p.name] = p.read_text(encoding='utf-8')

    pages = {name: Page(text) for name, text in contents.items() if name.endswith('.html')}
    assert {'home', 'homeCalculators', 'dashboard', 'pathshala', 'practice',
            'chapter2', 'planetExample', 'chapter2exam'} <= pages['index.html'].ids
    for name, page in pages.items():
        assert not any(RESTRICTED.search(i) for i in page.ids), name
        for link in page.links:
            url = urlsplit(link)
            assert not (url.scheme or url.netloc), (name, link)
            target = url.path or name
            assert target in contents, (name, link)
            assert parse_qs(url.query).get('chapter', ['1'])[0] in ('1', '2'), (name, link)
            if url.fragment:
                assert url.fragment in pages[target].ids, (name, link)
    manifest = json.loads(contents['manifest.webmanifest'])
    assert manifest['start_url'] == manifest['scope'] == './'
    assert all(icon['src'] in contents for icon in manifest['icons'])
    for name, text in contents.items():
        if name != 'style.css':
            assert not RESTRICTED.search(text), name
    assert not re.search(r'\b(?:fetch|addAll|put)\s*\(', contents['sw.js'])
    assert not re.search(r'\bserviceWorker\b', '\n'.join(contents[n] for n in pages))

    source = (master / 'index.html').read_text(encoding='utf-8')
    lo, hi = source.index(PRIVATE_START), source.index(PRIVATE_END)
    assert lo < hi
    assert set(map(int, re.findall(r'<section id="chapter(\d+)"', source[lo:hi]))) == set(range(3, 14))
    free_source = normalized(source[:lo] + source[hi:])
    private_html = re.findall(r'>([^<>]{45,})<', source[lo:hi])
    source_js = (master / 'app.js').read_text(encoding='utf-8')
    quiz_start = source_js.index('const chapter3Bank')
    js_signatures = re.findall(r"""["']([^"'\n<>{}]{45,})["']""", source_js[quiz_start:])
    free_js = normalized(source_js[:quiz_start])
    signatures = {normalized(s) for s in private_html if normalized(s) not in free_source}
    signatures.update(normalized(s) for s in js_signatures if normalized(s) not in free_js)
    signatures = {s for s in signatures if len(s) >= 45 and re.search('[\u0900-\u097f]', s)}
    assert len(signatures) > 100, 'Private signature extraction unexpectedly small'
    for name, text in contents.items():
        corpus = normalized(text)
        matches = [s for s in signatures if s in corpus]
        assert not matches, f'{name}: {len(matches)} private signatures found'
    print(f'Export audit passed: {len(contents)} files and {len(signatures)} private-text signatures.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path)
    parser.add_argument('private_master', type=Path)
    args = parser.parse_args()
    audit(args.directory, args.private_master)
