# Publicación — Cloudflare Pages

## Configuración manual previa
1. Crear el proyecto **galerink-hero** en Cloudflare Pages, en la cuenta correcta.
2. Elegir **GitHub Actions / Direct Upload** como mecanismo de publicación; evitar conectar un segundo auto-deploy desde GitHub para no duplicar publicaciones.
3. Crear en GitHub Actions los secrets `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`. El token debe tener el permiso mínimo de escritura en Cloudflare Pages para la cuenta correcta. No colocar tokens en el repositorio.
4. Usar GitHub Environment `production`, idealmente con aprobadores humanos antes del despliegue.
5. Revisar nombre del proyecto en `.github/workflows/deploy-cloudflare.yml` y cambiarlo si en Cloudflare se crea con otro nombre.
6. Verificar URL de Pages antes de conectar el dominio. No modificar galerink.com automáticamente.
7. Si se requiere estrictamente **sólo merge y no push directo**, proteger `main` con PR obligatorio; el workflow corre en cualquier push a `main` (incluidos merges).

## Flujo
PR → `Validate website` → revisión humana → merge autorizado en `main` → `Deploy Cloudflare Pages`.

## Validaciones antes de publicar
- Fotografías y logos oficiales incluidos, con derechos de uso.
- Rutas, política de privacidad, términos y eliminación de cuenta verificadas.
- Emails de soporte y proceso real de eliminación comprobados.
- Precios y prueba gratis confirmados.
- Prueba mobile real y Lighthouse.
- Mixpanel / consentimiento pendiente para un slice posterior.
