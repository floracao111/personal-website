#!/usr/bin/env python3
"""
Local preview server for the site.

    python3 scripts/serve.py          → http://localhost:4321

Better than `python3 -m http.server` for this site:
  • supports byte-range requests, which Safari needs to play videos at all
  • tells the browser not to keep stale copies, so replaced photos/videos show up immediately
"""

import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get('PORT', 4321))
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        # like GitHub Pages: /cuedkit serves cuedkit.html
        local = super().translate_path(path)
        if not os.path.exists(local) and os.path.isfile(local + '.html'):
            return local + '.html'
        return local

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def send_head(self):
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', self.headers.get('Range', ''))
        path = self.translate_path(self.path)
        if not match or not os.path.isfile(path):
            return super().send_head()

        size = os.path.getsize(path)
        start = int(match[1]) if match[1] else max(0, size - int(match[2] or 0))
        end = min(int(match[2]), size - 1) if match[1] and match[2] else size - 1
        if start >= size or start > end:
            self.send_error(416, 'Range Not Satisfiable')
            return None

        f = open(path, 'rb')
        f.seek(start)
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()
        self._remaining = end - start + 1
        return f

    def copyfile(self, source, outputfile):
        remaining = getattr(self, '_remaining', None)
        if remaining is None:
            return super().copyfile(source, outputfile)
        while remaining > 0:
            chunk = source.read(min(64 * 1024, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)
        self._remaining = None

    def log_message(self, *args):
        pass  # keep the terminal quiet


if __name__ == '__main__':
    print(f'Serving the site at http://localhost:{PORT}  (Ctrl+C to stop)')
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
