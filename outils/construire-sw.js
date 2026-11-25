#!/usr/bin/env node
// Ami des mots — écrit sw.js : l'application et ses ressources locales en cache,
// pour jouer hors connexion. Relancer après chaque modification ;
// la version du cache suit le contenu.
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ICI = path.join(__dirname, '..');
// v5.93 : images 3D de la bande de Plumo présentes dans img/bande (le jeu ne charge que celles-là).
const BANDE = fs.readdirSync(path.join(ICI, 'img/bande')).filter(f => /^(pico|zaza|rocket)\.webp$/.test(f)).sort();
fs.writeFileSync(path.join(ICI, 'js/bande-images.js'), '// Fabriqué par outils/construire-sw.js — ne pas modifier.\nwindow.BANDE_IMAGES = ' + JSON.stringify(BANDE.map(f => f.replace('.webp', ''))) + ';\n');
const fichiers = ['./', 'index.html', 'professeur.html', 'legal.html', 'monde-3d.html', 'manifest.webmanifest', 'css/jeu.css', 'css/professeur-ia.css', 'js/donnees.js', 'js/voix.js', 'js/phrases-enregistrees.js', 'js/textes.js', 'js/textes-plus.js', 'js/textes-ecrans.js', 'js/articulation.js', 'js/genres.js', 'js/confusions.js', 'js/vannes.js', 'js/apprentissage-adaptatif.js', 'js/tuteur-pedagogique.js', 'js/professeur-ia.js', 'js/jeu.js', 'js/mod-base.js', 'js/mod-ligue.js', 'js/mod-saisons.js', 'js/mod-veille.js', 'js/mod-oral.js', 'js/mod-classe.js', 'js/mod-parrainage.js', 'js/mod-ia.js', 'js/gb-moteur.js', 'js/gb-maths.js', 'js/gb-english.js', 'js/gb-sciences.js', 'js/gb-humanites.js', 'js/gb-options.js', 'js/gb-plus.js', 'js/gb-programme.js', 'js/gb-programme-plus.js', 'js/gb-examens.js', 'js/gb-sats-reels.js', 'js/mat-anglais-sup.js', 'js/mat-sup-droit.js', 'js/mat-sup-medecine.js', 'js/mat-sup-astro.js', 'js/mat-philo-notions.js', 'js/gb-options2.js', 'js/nasa.js', 'js/mat-trad-en-nasa.js', 'js/mat-trad-es-nasa.js', 'js/mat-histoire-pgm.js', 'js/themes.js', 'js/mod-angleterre.js',
  'mots-city.html', 'js/mots-city.js', 'vendor/three.module.js', 'js/kit3d.js', 'vendor/jsm/loaders/GLTFLoader.js', 'vendor/jsm/objects/Sky.js', 'vendor/jsm/postprocessing/EffectComposer.js', 'vendor/jsm/postprocessing/MaskPass.js', 'vendor/jsm/postprocessing/OutputPass.js', 'vendor/jsm/postprocessing/Pass.js', 'vendor/jsm/postprocessing/RenderPass.js', 'vendor/jsm/postprocessing/ShaderPass.js', 'vendor/jsm/postprocessing/UnrealBloomPass.js', 'vendor/jsm/shaders/CopyShader.js', 'vendor/jsm/shaders/LuminosityHighPassShader.js', 'vendor/jsm/shaders/OutputShader.js', 'vendor/jsm/utils/BufferGeometryUtils.js', 'vendor/jsm/utils/SkeletonUtils.js', 'assets/3d/barbarian.glb', 'assets/3d/knight.glb', 'assets/3d/mage.glb', 'assets/3d/rogue.glb', 'assets/3d/ville-kaykit.glb', 'assets/3d/nature.glb', 'js/metiers.js', 'js/quetes.js', 'js/pieges.js', 'js/anglais.js', 'js/clash.js', 'js/histoires.js', 'js/blagues-en.js', 'js/parcours.js', 'js/rigolade.js', 'js/clash-plus.js', 'js/salon.js', 'js/juge.js', 'js/vannes-libres.js', 'js/offre.js', 'js/capacitor-voix.js', 'js/maths-en.js', 'js/maths-es.js', 'js/maths-de.js', 'js/maths-it.js', 'js/maths-pt.js', 'js/maths.js', 'js/maths-2026-5e.js', 'js/maths-2026-2nde.js', 'js/maths-2026-1re.js', 'js/maths-2026-autres.js', 'js/sciences-en.js', 'js/sciences-es.js', 'js/sciences-de.js', 'js/sciences-it.js', 'js/sciences-pt.js', 'js/sciences.js', 'js/trash-talk.js', 'js/vannes-arrogantes.js', 'js/bande-images.js', 'js/bande-plumo.js', 'js/achats.js', 'js/rappels.js', 'js/epreuves.js', 'js/epreuves-spe.js', 'js/epreuves-plus.js', 'js/epreuves-oraux.js', 'js/epreuves-pro.js', 'js/matieres.js', 'js/mat-trad-es.js', 'js/mat-trad-en.js', 'js/mat-trad-en-sciences.js', 'js/mat-trad-en-sup.js', 'js/mat-trad-en-langues.js', 'js/mat-trad-en-francais.js', 'js/mat-trad-communs.js', 'js/mat-trad-es-sciences.js', 'js/mat-trad-es-sup.js', 'js/mat-trad-es-specialites.js', 'js/mat-trad-es-allemand.js', 'js/mat-trad-es-francais.js', 'js/mat-trad-de-histoire.js', 'js/mat-trad-de-sciences.js', 'js/mat-francais.js', 'js/mat-histoire.js', 'js/mat-histoire-sgm.js', 'js/mat-svt-pc.js', 'js/mat-sup.js', 'js/mat-anglais.js', 'js/mat-renfort.js', 'js/mat-langues.js', 'js/mat-specialites.js', 'js/vannes-cash.js', 'js/vannes-ironie.js', 'js/vannes-mots.js', 'js/config-site.js', 'assets/3d/vehicules.glb', 'assets/3d/ruines.glb', 'vendor/jsm/libs/meshopt_decoder.module.js', 'js/graphismes.js', 'js/ultra-ecrans.js', 'js/prof-anime.js', 'css/ultra.css', 'vendor/jsm/postprocessing/GTAOPass.js', 'vendor/jsm/postprocessing/SMAAPass.js', 'vendor/jsm/shaders/GTAOShader.js', 'vendor/jsm/shaders/PoissonDenoiseShader.js', 'vendor/jsm/shaders/SMAAShader.js', 'vendor/jsm/math/SimplexNoise.js', 'img/icone.svg', 'img/icone-192.png', 'img/icone-512.png', 'img/ami-3d-560.webp']
  .concat(fs.readdirSync(path.join(ICI, 'fonts')).filter(f => f.endsWith('.woff2')).sort().map(f => 'fonts/' + f))
  .concat(fs.readdirSync(path.join(ICI, 'assets/3d/q')).filter(f => f.endsWith('.glb')).sort().map(f => 'assets/3d/q/' + f))
  .concat(BANDE.map(f => 'img/bande/' + f))
  .concat(fs.readdirSync(path.join(ICI, 'img/pictos')).sort().map(f => 'img/pictos/' + f))
  .concat(fs.readdirSync(path.join(ICI, 'img/ombres')).sort().map(f => 'img/ombres/' + f));
const lourd = f => /^(vendor\/|assets\/3d\/|monde-3d\.html|mots-city\.html|js\/mots-city\.js|js\/kit3d\.js)/.test(f);
const taille3D = fichiers.filter(lourd).reduce((t, f) => t + fs.statSync(path.join(ICI, f)).size, 0);
const h = crypto.createHash('sha256');
for(const f of fichiers) if(f !== './') h.update(fs.readFileSync(path.join(ICI, f)));
const version = 'amidesmots-' + h.digest('hex').slice(0, 10);
fs.writeFileSync(path.join(ICI, 'sw.js'), `// GÉNÉRÉ par outils/construire-sw.js — ne pas éditer.
// Les ressources locales sont gardées pour jouer hors connexion. Le module 3D charge Three.js en ligne. Les voix (autre site)
// ne sont pas gardées ici : sans réseau, c'est la voix du téléphone.
const CACHE = '${version}';
const FICHIERS = ${JSON.stringify(fichiers.filter(f => !lourd(f)), null, 1)};
// v5.75 : la 3D (village, Mots City, three.js, modèles — environ ${(taille3D / 1e6).toFixed(0)} Mo) n'est plus téléchargée d'avance :
// elle est gardée seulement quand on l'ouvre. Le premier lancement est plus rapide et consomme moins de données.
const LOURDS = ${JSON.stringify(fichiers.filter(lourd), null, 1)};
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if(e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch:true }).then(r => r || fetch(e.request).then(rep => {
    // Un fichier 3D ouvert une fois est gardé pour jouer hors connexion ensuite.
    if(rep.ok && LOURDS.some(f => u.pathname.endsWith('/' + f))){ const copie = rep.clone(); caches.open(CACHE).then(c => c.put(e.request, copie)); }
    return rep;
  })));
});
`);
console.log(version, fichiers.length + ' fichiers');
