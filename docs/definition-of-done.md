# Definition of Done (DoD)

Este documento define el minimo para considerar el producto listo para:
- Alpha (pre-launch controlado)
- V1 publica

Mantenerlo vivo. Marcar items con checklist.

## Alpha (pre-launch controlado)

### Seguridad y datos
- [x] No hay secretos en git (rotados y removidos de historial).
- [x] Variables sensibles solo en entorno/secret manager.
- [ ] Supabase con RLS activo y validado para tablas criticas.
- [x] Cookies de sesion seguras (httpOnly, secure, sameSite).

### IA y costos
- [x] Guardrails de contenido activos (filtros y validaciones).
- [x] Rate limit por usuario/IP en endpoints de IA.
- [x] Timeouts y reintentos controlados en llamadas a IA.
- [x] Manejo de error con mensajes claros para el usuario.

### Producto minimo usable
- [ ] Flujos principales funcionan end-to-end (login, dashboard, programa, cuento).
- [ ] Mobile usable en las pantallas principales.
- [ ] Assets y textos sin errores de encoding.
- [ ] Sin pantallas rotas en navegadores principales.

### Operacion minima
- [ ] Logging sin debug verboso en produccion.
- [ ] Alertas basicas de errores (Sentry o similar).
- [ ] Backup y recuperacion basica definida.

## V1 publica

### Calidad y estabilidad
- [ ] CI con build + lint en cada push.
- [ ] Smoke tests para flujos criticos.
- [ ] Medicion de performance (LCP/CLS/TTI) y umbrales definidos.

### Seguridad y cumplimiento
- [ ] Politicas de privacidad y terminos listos y publicados.
- [ ] Consentimiento parental si aplica.
- [ ] Data retention y borrado de datos definidos.

### Escalabilidad y costos
- [ ] Limites de uso y presupuestos de IA definidos.
- [ ] Monitoreo de costos y alertas de consumo.
- [ ] Estrategia de degradacion si IA falla o se agota el presupuesto.

### Soporte y feedback
- [ ] Canal de soporte y feedback en producto.
- [ ] Proceso de triage de bugs y SLAs basicos.
- [ ] Roadmap y proceso de releases definido.
