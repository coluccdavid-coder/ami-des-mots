const fs = require('fs'), path = require('path'); const { JSDOM } = require('jsdom');
const R = process.cwd(); const html = fs.readFileSync(path.join(R, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script[^>]*src="(js\/[^"]+)"/g)].map(m => m[1]).filter(s => !/kit3d|mots-city|three/.test(s));
function page(lang){
  const d = new JSDOM('<!doctype html><html><body></body></html>', { url:'http://localhost/index.html', runScripts:'outside-only', pretendToBeVisual:true });
  const w = d.window; Object.defineProperty(w.navigator, 'language', { value:lang });
  w.speechSynthesis = { getVoices:() => [], speak(){}, cancel(){} }; w.HTMLCanvasElement.prototype.getContext = () => null; w.fetch = async () => ({ ok:false, json:async () => ({}) });
  w.matchMedia = () => ({ matches:false, addListener(){}, addEventListener(){} }); w.scrollTo = () => {}; w.HTMLMediaElement.prototype.play = () => Promise.resolve();
  for(const s of scripts){ try{ w.eval(fs.readFileSync(path.join(R, s), 'utf8')); }catch(e){} }
  w.document.dispatchEvent(new w.Event('DOMContentLoaded')); return w;
}
const ECRANS = [['accueil'], ['porte-mots'], ['anglais'], ['maths'], ['matieres'], ['potes'], ['battle'], ['clash-libre'], ['reglages'], ['plus'], ['parents'], ['vestiaire'], ['carnet']];
const FR = /\b(le|la|les|des|du|une|est|pour|avec|tu|ton|ta|tes|vos|votre|pas|qui|que|dans|sur|et)\b/gi;
for(const lang of ['es', 'de', 'ar']){
  const w = page(lang); const d = w.document; const res = [];
  for(const [a] of ECRANS){
    try{ const x = d.createElement('button'); x.dataset.a = a; d.body.appendChild(x); x.click(); x.remove(); }catch(e){}
    const m = d.querySelector('main'); const txt = m ? m.textContent.replace(/\s+/g, ' ') : '';
    const mots = txt.split(' ').length, fr = (txt.match(FR) || []).length;
    res.push(a + ' ' + Math.round(100 * fr / Math.max(1, mots) * 4) + '%');
  }
  console.log(lang, w.AmiDesMots && w.AmiDesMots.base.ui, '→', res.join(' | '));
}
