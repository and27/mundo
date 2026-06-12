# Specs — flujo de trabajo

Spec-driven development para un equipo de 1 persona. Regla central:
**si no está en el spec, es otro issue.** Así evitamos PRs monstruo.

## Ciclo

1. **Spec** — archivo `NNN-nombre.md` en esta carpeta. Corto: problema,
   solución propuesta, criterios de aceptación, fuera de alcance.
2. **Issue** — se crea en GitHub referenciando el spec. Es el backlog visible.
3. **Rama** — `feat/...` o `fix/...` desde `main`, vive 1-3 días máximo.
4. **Commits** — pequeños y temáticos (docs / feature / wiring por separado).
5. **PR** — cierra el issue con `Closes #N`. Merge a `main`, la rama muere.

No usamos rama `develop`: `main` siempre es deployable (trunk-based).
Vercel genera preview por PR y producción desde `main`.

## Estado de los specs

| Spec | Issue | Estado |
|------|-------|--------|
| [001 — Funnel de producto con PostHog](001-analytics-funnel.md) | [#54](https://github.com/and27/mundo/issues/54) | En curso |
| 002 — Bucket privado + URLs firmadas | [#55](https://github.com/and27/mundo/issues/55) | Pendiente |
| 003 — Páginas públicas de guías (SEO/AEO) | [#56](https://github.com/and27/mundo/issues/56) | Pendiente |
| 004 — Landing enfocada + fake door de precio | [#57](https://github.com/and27/mundo/issues/57) | Pendiente |
| 005 — Página demo para especialistas | [#58](https://github.com/and27/mundo/issues/58) | Pendiente |
