# Galerink Hero — Procedimiento de releases

**Estado:** estándar acordado para `alliende/galerink-hero`.  
**Servicio:** Cloudflare Pages con integración GitHub nativa.  
**Dominio de producción:** `apprazi.com` y URL técnica `galerink-hero.pages.dev`.  
**Rama productiva:** `main`.

## Principio

**Hacer merge en `main` equivale a autorizar un despliegue de producción.**

No utilizar un workflow separado de Wrangler ni publicar assets manualmente. GitHub Actions valida el código; Cloudflare Pages construye y publica el resultado de `main`.

## Flujo estándar

1. **Issue:** declarar problema, objetivo y criterios de aceptación. Los cambios triviales pueden ir directo a PR, manteniendo trazabilidad.
2. **Implementación:** crear `feature/<descripcion>` desde `main`; mantener commits enfocados.
3. **PR hacia `main`:** describir alcance, evidencia visual, pruebas, riesgos y rollback.
4. **Validación automática:** `npm run check && npm run build` (CI en GitHub); Cloudflare Pages genera una preview de la rama/PR.
5. **Revisión humana:** verificar la preview en escritorio y móvil, imágenes, CTA, enlaces, accesibilidad básica, SEO, las rutas críticas y cualquier cambio legal o de precios. Confirmar que la preview corresponde al último commit.
6. **Release:** con checks verdes y revisión aprobada, **Squash and merge** del PR en `main`. Cloudflare Pages despliega automáticamente el commit de `main`.
7. **Verificación posterior:** confirmar deployment `success`, verificar `https://apprazi.com/`, `/eliminar-cuenta`, CTA principales y ausencia de recursos faltantes.
8. **Cierre:** cerrar el issue con enlaces al PR, commit y despliegue; registrar correcciones pendientes.

## Configuración de Cloudflare Pages

| Campo | Valor |
| --- | --- |
| Repositorio | `alliende/galerink-hero` |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `npm run check && npm run build` |
| Output directory | `dist` |
| Root directory | `/` |
| Previews | Habilitadas para ramas de desarrollo |

Cambios en Cloudflare o DNS se controlan como tareas separadas, no se mezclan innecesariamente con releases de contenido.

## Puertas de calidad

- Los checks deben estar verdes **en el HEAD que se fusionará**.
- La preview debe funcionar en la URL real de la rama, no solo el build.
- Probar rutas principales y recursos gráficos.
- Cambios de precios, claims, privacidad, cuenta o eliminación requieren verificación del responsable.
- No publicar secretos ni métricas/testimonios inventados.
- No hacer merge automático de PR en borrador.
- Proteger `main` con PR obligatorio y check requerido `Validate website / validate` (nombre exacto a confirmar desde la UI de GitHub).
- Idealmente exigir al menos una aprobación humana y bloquear pushes directos.

## Incidente o rollback

Si producción falla:
1. Registrar qué release y commit están afectados.
2. Si urge restablecer el servicio, usar **Rollback** al despliegue estable anterior desde Cloudflare Pages, cuando la opción esté disponible.
3. Hacer `git revert` del commit problemático mediante PR para que el código de `main` vuelva a representar lo publicado y el problema no reaparezca en el siguiente deploy.
4. Verificar la URL productiva y dejar evidencia en el issue.

## Versiones

Para Hero **no exigimos una rama `release/*` ni tags en cada publicación**. El commit de merge y el despliegue de Cloudflare sirven como identificadores. Crear un tag `vX.Y.Z` solo para hitos que merezcan referencia comercial o histórica.

## Reutilización DevLab

Este flujo es el **perfil liviano para sitios web estáticos con preview por PR**:

`Issue → feature/* → PR → CI + preview → revisión → squash merge a main → deploy automático → smoke test`.

Al usarlo en otro repositorio, adaptar proveedor de hosting, ramas, comandos, pruebas, riesgos y estrategia de rollback. **No copiarlo automáticamente** a aplicaciones móviles, APIs, sistemas con migraciones de datos o entornos regulados: esos requieren aprobaciones y un mecanismo de release propio.

## Estado de enforcement (pendiente de comprobar)

- GitHub muestra **cero repository rulesets**.
- La conexión actual no tiene permiso para leer la protección clásica de `main`; su estado es desconocido.
- Revisar manualmente en **Settings → Branches / Rules → Rulesets** que `main` exija PR, revisión y checks verdes. No darlo por garantizado solo por este documento.
