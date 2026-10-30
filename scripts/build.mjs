import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
rmSync('dist',{recursive:true,force:true});mkdirSync('dist',{recursive:true});
for(const p of ['index.html','eliminar-cuenta.html','css','js','assets','_redirects','robots.txt']){
 if(existsSync(p))cpSync(p,'dist/'+p,{recursive:true});
}
console.log('Sitio estático generado en dist/');
