#!/usr/bin/env python3
"""Export the reviewed public site into a new directory, without repository history."""
import argparse
from pathlib import Path
import shutil
import tempfile

ROOT = Path(__file__).resolve().parents[1]
FILES = {
    'index.html': 'public-preview.html',
    'course.html': 'public-course.html',
    'akshara-chakra.html': 'akshara-chakra.html',
    'public-preview.js': 'public-preview.js',
    'public-theme.js': 'public-theme.js',
    'district-sunrise.js': 'district-sunrise.js',
    'home-tools.js': 'home-tools.js',
    'style.css': 'style.css',
    'manifest.webmanifest': 'manifest.webmanifest',
    'icon.svg': 'icon.svg',
    'sw.js': 'tools/public-cache-retirement.js',
}


def build(destination):
    destination = destination.resolve()
    if destination.exists():
        raise FileExistsError(f'Choose a new output directory: {destination}')
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=destination.parent) as temporary:
        candidate = Path(temporary) / 'site'
        candidate.mkdir()
        for name, source in FILES.items():
            path = ROOT / source
            if path.is_symlink() or not path.is_file():
                raise ValueError(f'Expected a regular source file: {path}')
            target = candidate / name
            if name.endswith('.html'):
                html = path.read_text(encoding='utf-8')
                html = html.replace('href="public-preview.html', 'href="index.html')
                html = html.replace('href="public-course.html', 'href="course.html')
                html = html.replace('</head>', '<link rel="icon" href="icon.svg"></head>', 1)
                target.write_text(html, encoding='utf-8')
            else:
                shutil.copyfile(path, target)
        candidate.rename(destination)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination', type=Path)
    arguments = parser.parse_args()
    build(arguments.destination)
    print(f'Public candidate exported to {arguments.destination}')
