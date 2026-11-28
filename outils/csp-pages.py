#!/usr/bin/env python3
# Ami des mots — v10.7 : politique de sécurité (CSP) des pages secondaires.
# Les scripts écrits dans la page sont autorisés par leur empreinte sha256 : si l'un d'eux change, relancer ce script.
import re, hashlib, base64, sys, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
PAGES = {
  'professeur.html': "default-src 'self'; img-src 'self' data:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; script-src 'self'{h}; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'",
  'legal.html': "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'",
  'monde-3d.html': "default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'wasm-unsafe-eval'{h}; connect-src 'self' data: blob:; worker-src 'self' blob:; object-src 'none'; base-uri 'none'; form-action 'none'",
  'mots-city.html': "default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; style-src 'self' 'unsafe-inline'; script-src 'self' 'wasm-unsafe-eval'{h}; connect-src 'self' data: blob:; worker-src 'self' blob:; object-src 'none'; base-uri 'none'; form-action 'none'",
}
verifier = '--verifier' in sys.argv
ko = 0
for f, modele in PAGES.items():
  s = open(f, encoding='utf8').read()
  hs = ["'sha256-" + base64.b64encode(hashlib.sha256(m.group(1).encode('utf8')).digest()).decode() + "'"
        for m in re.finditer(r'<script(?:\s+type="(?:module|importmap)")?>(.*?)</script>', s, re.S)]
  csp = modele.replace('{h}', (' ' + ' '.join(hs)) if hs else '')
  balise = '<meta http-equiv="Content-Security-Policy" content="' + csp + '">'
  actuelle = re.search(r'<meta http-equiv="Content-Security-Policy" content="[^"]*">', s)
  if verifier:
    if not actuelle or actuelle.group(0) != balise: print('CSP à mettre à jour :', f); ko += 1
    continue
  s = s.replace(actuelle.group(0), balise) if actuelle else re.sub(r'(<meta charset="utf-8">)', r'\1\n' + balise.replace('\\', '\\\\'), s, count=1)
  open(f, 'w', encoding='utf8').write(s); print(f, len(hs), 'script(s) en ligne')
sys.exit(1 if ko else 0)
