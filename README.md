# Galerink — sitio comercial

Sitio estático de Galerink. Cambios mediante PR, revisiones y validaciones.

- `main`: producción, publicar mediante **integración Git nativa Cloudflare Pages** después de merge autorizado.
- `feature/*`: cambios y previews sin afectar producción.
- GitHub Actions: **solo CI**, sin secretos ni deploy manual a Cloudflare.

Los 14 recursos visuales ya están incluidos en `assets/`. Configurar Cloudflare usando [`docs/CLOUDFLARE.md`](docs/CLOUDFLARE.md). Las tareas comerciales y legales pendientes están en `docs/BACKLOG-LANZAMIENTO.md`.

Para visualizar el PR sin hacer merge, habilitar despliegues de preview para `feature/*` en Cloudflare Pages y abrir la URL generada desde **Deployments**.
