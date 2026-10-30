# Galerink — sitio comercial

Sitio estático de Galerink. Cambios mediante PR, revisiones y validaciones.

- `main`: producción, publicar mediante **integración Git nativa Cloudflare Pages** después de merge autorizado.
- `feature/*`: cambios y previews sin afectar producción.
- GitHub Actions: **solo CI**, sin secretos ni deploy manual a Cloudflare.

Configurar Cloudflare usando [`docs/CLOUDFLARE.md`](docs/CLOUDFLARE.md). Los assets de la última versión deben incorporarse antes de fusionar el PR. Las tareas comerciales y legales pendientes están en `docs/BACKLOG-LANZAMIENTO.md`.
