// Petit serveur statique pour les tests (dossier passé en argument).
const http=require('http'),fs=require('fs'),path=require('path');
const RACINE=path.resolve(process.argv[2]),PORT=+process.argv[3]||8765;
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.webmanifest':'application/manifest+json','.woff2':'font/woff2'};
http.createServer((q,r)=>{let f=path.join(RACINE,decodeURIComponent(q.url.split('?')[0]));if(!f.startsWith(RACINE)){r.writeHead(403);return r.end()}
if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end('404')}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})}).listen(PORT,()=>console.log('ok '+PORT));
