"""Inject the docs banner <link>/<script> tags into every HTML file in a docs tarball.

Usage: inject_banner.py IN_TARBALL OUT_TARBALL VERSION

The archived docs get the same snippet injected at the edge
(`netlify/edge-functions/docs-archive.ts`); this applies it to the `latest`
docs that are built into the site.
"""

import io
import re
import sys
import tarfile

SNIPPET = (
    '<link rel="stylesheet" href="/theme/css/docs-banner.css" />\n'
    '<script defer src="/theme/js/docs-banner.js" data-envoy-docs-version="{version}"></script>\n'
)
HEAD_END = re.compile(rb"</head>", re.IGNORECASE)


def inject(html: bytes, snippet: bytes) -> bytes:
    match = HEAD_END.search(html)
    if not match:
        return snippet + html
    return html[: match.start()] + snippet + html[match.start() :]


def main(src: str, dst: str, version: str) -> None:
    snippet = SNIPPET.format(version=version).encode()
    with tarfile.open(src, "r:*") as tin, tarfile.open(dst, "w:gz") as tout:
        for member in tin:
            data = tin.extractfile(member) if member.isfile() else None
            if data is not None and member.name.endswith((".html", ".htm")):
                content = inject(data.read(), snippet)
                member.size = len(content)
                tout.addfile(member, io.BytesIO(content))
            else:
                tout.addfile(member, data)


if __name__ == "__main__":
    main(*sys.argv[1:4])
