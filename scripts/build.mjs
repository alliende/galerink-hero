import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });

for (const path of ['index.html', 'eliminar-cuenta.html', 'css', 'js', 'assets', '_redirects', 'robots.txt']) {
  if (existsSync(path)) cpSync(path, 'dist/' + path, { recursive: true });
}

const token = process.env.MIXPANEL_PROJECT_TOKEN?.trim();
if (token) {
  if (!/^[a-f0-9]{32}$/i.test(token)) {
    throw new Error('MIXPANEL_PROJECT_TOKEN debe ser un token de tracking válido de Mixpanel.');
  }

  cpSync('node_modules/mixpanel-browser/dist/mixpanel.umd.js', 'dist/js/mixpanel.js');
  const page = readFileSync('dist/index.html', 'utf8');
  writeFileSync('dist/index.html', page.replace('<!-- hero-analytics -->', [
    '<script src="/js/mixpanel.js" defer></script>',
    `<script src="/js/hero-analytics.js" data-mixpanel-token="${token}" defer></script>`,
  ].join('\n')));
}

console.log('Sitio estático generado en dist/');
