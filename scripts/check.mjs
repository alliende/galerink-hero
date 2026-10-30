import { existsSync, readFileSync } from 'node:fs';
const required = ['index.html','eliminar-cuenta.html','css/site.css','js/site.js','assets/galerink-logo.png','assets/galerink-logo-white.png','assets/favicon.ico','assets/hero-event.webp','assets/attendees.webp','assets/branding.webp','assets/workflow-camera.webp','assets/workflow-qr.webp','assets/workflow-dashboard.webp'];
const missing=required.filter(p=>!existsSync(p));
if(missing.length){console.error('Faltan archivos requeridos:\n'+missing.join('\n'));process.exit(1);}
for(const p of ['index.html','eliminar-cuenta.html']){
 const html=readFileSync(p,'utf8');
 if(!html.includes('<html')||!html.includes('<title>')) throw new Error('Documento HTML inválido: '+p);
 if(/propuesta visual de landing|generado por ia/i.test(html)) throw new Error('Texto provisional visible: '+p);
}
console.log('Estructura y recursos mínimos OK');
