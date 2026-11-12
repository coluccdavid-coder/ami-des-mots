#!/usr/bin/env node
// Ami des mots — écrit sw.js : tout le jeu (images comprises) en cache,
// pour jouer hors connexion. Relancer après chaque modification ;
// la version du cache suit le contenu.
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ICI = path.join(__dirname, '..');
const fichiers = ['./', 'index.html', 'manifest.webmanifest', 'css/jeu.css', 'js/donnees.js', 'js/voix.js', 'js/textes.js', 'js/articulation.js', 'js/jeu.js',
  'img/icone.svg', 'img/icone-192.png', 'img/icone-512.png']
  .concat(fs.readdirSync(path.join(ICI, 'fonts')).filter(f => f.endsWith('.woff2')).sort().map(f => 'fonts/' + f))
  .concat(fs.readdirSync(path.join(ICI, 'img/pictos')).sort().map(f => 'img/pictos/' + f));
const h = crypto.createHash('sha256');
for(const f of fichiers) if(f !== './') h.update(fs.readFileSync(path.join(ICI, f)));
const version = 'amidesmots-' + h.digest('hex').slice(0, 10);
fs.writeFileSync(path.join(ICI, 'sw.js'), `// GÉNÉRÉ par outils/construire-sw.js — ne pas éditer.
// Le jeu entier est gardé pour jouer hors connexion. Les voix (autre site)
// ne sont pas gardées ici : sans réseau, c'est la voix du téléphone.
const CACHE = '${version}';
const FICHIERS = ${JSON.stringify(fichiers, null, 1)};
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if(e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch:true }).then(r => r || fetch(e.request)));
});
`);
console.log(version, fichiers.length + ' fichiers');
