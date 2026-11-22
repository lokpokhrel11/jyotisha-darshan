#!/usr/bin/env python3
"""Read Actions archives and report aggregate exposure without printing their contents."""
from base64 import b64decode
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from html import unescape
from io import BytesIO
import json
import os
from pathlib import Path
import re
import tarfile
from urllib.error import HTTPError
from urllib.request import HTTPRedirectHandler, Request, build_opener, urlopen
from zipfile import BadZipFile, ZipFile

API = 'https://api.github.com/repos/' + os.environ['GITHUB_REPOSITORY'] + '/actions/artifacts'
MARKERS = re.compile(
    rb'id=["\x27]chapter(?:[3-9]|1[0-3])(?:exam)?["\x27]|'
    rb'\bconst\s+chapter3Bank\s*=|\bid=["\x27]ch(?:[3-9]|1[0-3])Assessment["\x27]',
    re.I,
)
# Report diagnostics referencing later chapters separately from source markers.
REFERENCES = re.compile(rb'chapter(?:=|%3D|%3d)(?:[3-9]|1[0-3])(?!\d)|'
                        rb'\bchapter(?:[3-9]|1[0-3])(?:exam|[-_])', re.I)
TEXT = ('.html', '.js', '.json', '.txt', '.log', '.md', '.xml', '.svg', '.css', '.trace', '.network')
IMAGES = ('.png', '.jpg', '.jpeg', '.webp')
ARCHIVES = ('.zip', '.tar', '.tar.gz', '.tgz', '.tar.br', '.gz')
LIMIT = 80 * 1024 * 1024
EMBEDDED_REPORT = re.compile(rb'data:application/zip;base64,([A-Za-z0-9+/=]+)')


def normalize(text):
    return ' '.join(unescape(text).split())


def lesson_signatures():
    # Use the tracked legacy public baseline. The audit runner has no private checkout.
    source = Path(__file__).resolve().parents[1].joinpath('index.html').read_text(encoding='utf-8')
    start = source.index('<section id="chapter3"')
    end = source.index('<section id="consult"', start)
    free = normalize(source[:start] + source[end:])
    return {value.encode() for snippet in re.findall(r'>([^<>]{65,})<', source[start:end])
            if (value := normalize(snippet)) not in free
            and re.search(r'[\u0900-\u097f]', value)}


SIGNATURES = lesson_signatures()
# A single fast search avoids rescanning a large report once per signature.
PASSAGES = re.compile(b'|'.join(re.escape(value) for value in sorted(SIGNATURES)))



class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args):
        return None


def api(url, follow=True):
    client = build_opener() if follow else build_opener(NoRedirect())
    headers = {'Authorization': 'Bearer ' + os.environ['GH_TOKEN'],
               'Accept': 'application/vnd.github+json'}
    return client.open(Request(url, headers=headers), timeout=40)


def inspect_members(members, depth, results):
    for name, size, read in members:
        name = name.lower()
        if name.endswith(IMAGES):
            results.add('has images')
        elif name.endswith(TEXT + ARCHIVES):
            if depth > 3 or size > LIMIT:
                results.add('some members skipped')
                continue
            data = read()
            if name.endswith(ARCHIVES):
                inspect_archive(data, depth + 1, results)
            else:
                if MARKERS.search(data):
                    results.add('restricted source markers')
                if REFERENCES.search(data):
                    results.add('restricted route references')
                normalized = normalize(data.decode('utf-8', errors='replace')).encode()
                if PASSAGES.search(normalized):
                    results.add('restricted lesson passages')
                if name.endswith('.html') and depth < 3:
                    for encoded in EMBEDDED_REPORT.finditer(data):
                        inspect_archive(b64decode(encoded[1], validate=True), depth + 1, results)


def inspect_archive(data, depth, results):
    if data.startswith(b'PK'):
        with ZipFile(BytesIO(data)) as archive:
            inspect_members(((m.filename, m.file_size, lambda: archive.read(m))
                             for m in archive.infolist() if not m.is_dir()), depth, results)
    else:
        try:
            with tarfile.open(fileobj=BytesIO(data), mode='r:*') as archive:
                inspect_members(((m.name, m.size, lambda: archive.extractfile(m).read(LIMIT + 1))
                                 for m in archive if m.isfile()), depth, results)
        except tarfile.ReadError:
            results.add('some members skipped')


def inspect_artifact(item):
    results = set()
    if item['expired'] or item['size_in_bytes'] > LIMIT:
        return item, {'expired or oversized'}
    try:
        with api(API + f"/{item['id']}/zip", follow=False) as response:
            data = response.read(LIMIT + 1)
    except HTTPError as redirect:
        if redirect.code != 302:
            return item, {f'download HTTP {redirect.code}'}
        try:
            # The redirect uses a signed URL. Never forward the GitHub token.
            with urlopen(redirect.headers['Location'], timeout=40) as response:
                data = response.read(LIMIT + 1)
        except HTTPError as error:
            return item, {f'storage HTTP {error.code}'}
        except OSError:
            return item, {'storage inaccessible'}
    except OSError:
        return item, {'download inaccessible'}
    if len(data) > LIMIT:
        return item, {'oversized'}
    try:
        inspect_archive(data, 0, results)
    except (BadZipFile, OSError, ValueError, RuntimeError) as error:
        return item, {type(error).__name__}
    return item, results | {'scanned'}


def main():
    inventory = []
    for page in range(1, 101):
        with api(f'{API}?per_page=100&page={page}') as response:
            batch = json.load(response)['artifacts']
        inventory.extend(batch)
        if len(batch) < 100:
            break
    totals = {}
    confirmed_ids = []
    passage_ids = []
    print(f'Checking {len(inventory)} artifacts and {len(SIGNATURES)} lesson signatures.', flush=True)
    with ThreadPoolExecutor(max_workers=6) as pool:
        for item, results in pool.map(inspect_artifact, inventory):
            totals.setdefault(item['name'], Counter()).update(results | {'listed'})
            if 'restricted source markers' in results:
                confirmed_ids.append(item['id'])
            if 'restricted lesson passages' in results:
                passage_ids.append(item['id'])
    for name, counts in sorted(totals.items()):
        print(json.dumps({'name': name, **counts}, sort_keys=True))
    print('Artifacts with restricted source markers:', ', '.join(map(str, confirmed_ids)))
    print('Artifacts with restricted lesson passages:', ', '.join(map(str, passage_ids)))


if __name__ == '__main__':
    main()
