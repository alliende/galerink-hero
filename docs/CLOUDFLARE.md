# Publicación — Cloudflare Pages (integración nativa GitHub)

El proyecto Cloudflare Pages ya está conectado a `alliende/galerink-hero`. **Cloudflare Pages es el único publicador**. GitHub Actions se usa únicamente para validación (`.github/workflows/ci.yml`).

## Configurar en Cloudflare

Entrar a **Workers & Pages → proyecto Pages → Settings → Builds** (el nombre de la sección puede variar ligeramente).

| Campo | Valor |
| --- | --- |
| Git repository | `alliende/galerink-hero` |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `npm run check && npm run build` |
| Build output directory | `dist` |
| Root directory | raíz del repositorio (normalmente `/`) |

El comando `check` es deliberadamente bloqueante: si faltan recursos no habrá publicación. No requiere `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` ni Wrangler en GitHub Actions.

## Control de ramas y publicaciones

- **Producción**: habilitar automáticamente solo la rama `main`.
- **Previews**: habilitar `feature/*` (o todas las ramas no productivas si se desea).
- Un push a `feature/*` puede generar una URL de preview de Cloudflare; **no es producción**.
- Requerir PR y checks verdes para fusionar a `main`; no publicar por push directo. Configurar protección de rama en GitHub.
- El merge aprobado en `main` hará que Cloudflare despliegue automáticamente. No existe workflow paralelo de GitHub Actions.
- **No conectar todavía `galerink.com`** hasta verificar el sitio en `*.pages.dev`.

## Pendientes antes del primer deploy correcto

- [ ] Añadir los nueve archivos binarios obligatorios a `assets/` (logo oficial, favicon y fotografías); CI está bloqueado por ellos intencionalmente.
- [ ] Ejecutar `npm run check && npm run build` y verificar `dist/index.html`.
- [ ] Corroborar enlaces de prueba gratis, precios, texto comercial y proceso real de eliminación de cuenta.
- [ ] Completar las páginas legales (privacidad y términos).
- [ ] Probar móvil y escritorio, Lighthouse y accesibilidad.
- [ ] Revisar la URL de preview y aprobar el PR antes del merge.

## Diagnóstico

- **Página vacía o 404**: comprobar que `main` tenga el sitio, que `dist/index.html` exista y que `dist` sea la carpeta de salida.
- **Build rojo**: inspeccionar los logs de Cloudflare; el validador identifica recursos faltantes.
- **Dos despliegues**: confirmar que no exista un workflow de Wrangler; se eliminó `.github/workflows/deploy-cloudflare.yml`.
- El nombre del proyecto Pages puede ser distinto del repositorio: no es un problema cuando la integración Git está configurada.

Documentación: https://developers.cloudflare.com/pages/configuration/git-integration/

## Analítica del hero

Configurar `MIXPANEL_PROJECT_TOKEN` en **Settings → Variables and Secrets** del proyecto Pages. Production usa Galerink (4072833) y Preview usa Lab (3428049). Usar el token de tracking del SDK web. El build lo incluye en el HTML público, así que nunca usar un API Secret ni una credencial de servicio. Sin variable, el sitio se construye con la analítica desactivada.

En el preview abrir `/?utm_source=instagram&utm_medium=social&utm_campaign=hero_qa` y pulsar «Prueba gratis». En Live View de Lab verificar `hero_viewed` y `hero_trial_clicked` con `surface=hero`, las mismas UTM y el mismo ID anónimo. El clic incluye `cta_location`. Repetir sin UTM y con «Iniciar sesión» para comprobar que solo se registra la visita. Probar el enlace también con el SDK bloqueado.

En Galerink, crear un embudo de usuarios únicos `hero_viewed` → `hero_trial_clicked`, con `utm_source=instagram` en el primer paso y una ventana de 30 minutos. Para comparar la ubicación de los botones, desglosar el evento de clic por `cta_location`.
