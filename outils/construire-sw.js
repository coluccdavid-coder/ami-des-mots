#!/usr/bin/env node
// Ami des mots — écrit sw.js : l'application et ses ressources locales en cache,
// pour jouer hors connexion. Relancer après chaque modification ;
// la version du cache suit le contenu.
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ICI = path.join(__dirname, '..');
const fichiers = ['./', 'index.html', 'professeur.html', 'monde-3d.html', 'manifest.webmanifest', 'css/jeu.css', 'css/professeur-ia.css', 'js/donnees.js', 'js/voix.js', 'js/textes.js', 'js/articulation.js', 'js/genres.js', 'js/confusions.js', 'js/vannes.js', 'js/apprentissage-adaptatif.js', 'js/tuteur-pedagogique.js', 'js/professeur-ia.js', 'js/jeu.js',
  'mots-city.html', 'js/mots-city.js', 'vendor/three.module.js', 'js/kit3d.js', 'vendor/jsm/loaders/GLTFLoader.js', 'vendor/jsm/objects/Sky.js', 'vendor/jsm/postprocessing/EffectComposer.js', 'vendor/jsm/postprocessing/MaskPass.js', 'vendor/jsm/postprocessing/OutputPass.js', 'vendor/jsm/postprocessing/Pass.js', 'vendor/jsm/postprocessing/RenderPass.js', 'vendor/jsm/postprocessing/ShaderPass.js', 'vendor/jsm/postprocessing/UnrealBloomPass.js', 'vendor/jsm/shaders/CopyShader.js', 'vendor/jsm/shaders/LuminosityHighPassShader.js', 'vendor/jsm/shaders/OutputShader.js', 'vendor/jsm/utils/BufferGeometryUtils.js', 'vendor/jsm/utils/SkeletonUtils.js', 'assets/3d/barbarian.glb', 'assets/3d/knight.glb', 'assets/3d/mage.glb', 'assets/3d/rogue.glb', 'assets/3d/ville-kaykit.glb', 'assets/3d/nature.glb', 'js/metiers.js', 'js/quetes.js', 'js/pieges.js', 'js/anglais.js', 'js/clash.js', 'js/histoires.js', 'js/blagues-en.js', 'js/parcours.js', 'js/rigolade.js', 'js/clash-plus.js', 'js/salon.js', 'js/juge.js', 'js/offre.js', 'js/capacitor-voix.js', 'js/maths.js', 'js/sciences.js', 'js/vannes-cash.js', 'js/vannes-mots.js', 'js/config-site.js', 'assets/3d/vehicules.glb', 'assets/3d/ruines.glb', 'vendor/jsm/libs/meshopt_decoder.module.js', 'js/graphismes.js', 'js/ultra-ecrans.js', 'css/ultra.css', 'vendor/jsm/postprocessing/GTAOPass.js', 'vendor/jsm/postprocessing/SMAAPass.js', 'vendor/jsm/shaders/GTAOShader.js', 'vendor/jsm/shaders/PoissonDenoiseShader.js', 'vendor/jsm/shaders/SMAAShader.js', 'vendor/jsm/math/SimplexNoise.js', 'img/icone.svg', 'img/icone-192.png', 'img/icone-512.png', 'img/ami-3d.webp']
  .concat(fs.readdirSync(path.join(ICI, 'fonts')).filter(f => f.endsWith('.woff2')).sort().map(f => 'fonts/' + f))
  .concat(fs.readdirSync(path.join(ICI, 'assets/3d/q')).filter(f => f.endsWith('.glb')).sort().map(f => 'assets/3d/q/' + f))
  .concat(fs.readdirSync(path.join(ICI, 'img/pictos')).sort().map(f => 'img/pictos/' + f))
  .concat(fs.readdirSync(path.join(ICI, 'img/ombres')).sort().map(f => 'img/ombres/' + f));
const h = crypto.createHash('sha256');
for(const f of fichiers) if(f !== './') h.update(fs.readFileSync(path.join(ICI, f)));
const version = 'amidesmots-' + h.digest('hex').slice(0, 10);
fs.writeFileSync(path.join(ICI, 'sw.js'), `// GÉNÉRÉ par outils/construire-sw.js — ne pas éditer.
// Les ressources locales sont gardées pour jouer hors connexion. Le module 3D charge Three.js en ligne. Les voix (autre site)
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
