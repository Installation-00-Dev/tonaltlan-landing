# Origen de esta skill

- Fuente: https://github.com/pbakaus/impeccable (`.claude/skills/impeccable/`)
- Commit fijado: `4b6b80f9c21cac9376deadaa2ef4924f341b8b4d` (2026-11-08), skill v4.8.1
- Licencia: Apache 2.0 (ver `LICENSE` y `NOTICE.md` en esta carpeta)
- Archivos copiados sin modificaciones.

## Sobre el lanzador `scripts/impeccable`

La skill usa un lanzador que, la primera vez, **descarga un binario** (su motor) y
verifica su SHA-256 contra `scripts/engine-checksums.txt`. El binario queda en
`scripts/bin/`, que no se versiona (`.gitignore`).

Ejecutar ese binario es decisión de quien desarrolla: en una sesión con permisos
restringidos puede pedir aprobación. Sin el motor, la skill funciona en modo
lectura (sus guías en `reference/` siguen aplicando); lo que se pierde es el
detector automático (`impeccable detect`).

Para actualizarla: revisa el diff del repositorio original antes de copiar la
nueva versión y actualiza el commit fijado aquí.
