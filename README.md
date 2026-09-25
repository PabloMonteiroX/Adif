# Adif · Simulador OEP 2026

PWA de estudio para el perfil 26/11PO Montador Eléctrico IISS. Funciona sin conexión (service worker) y guarda el progreso en el navegador.

## Fuentes de preguntas

Las dos fuentes están separadas. Se cambia de una a otra con el selector de arriba.

| Fuente | Archivo | Preguntas |
|---|---|---|
| Oficiales Adif 2023–2025 | embebidas en `index.html` (`QUESTIONS`) | 160 |
| UGT Entre Raíles (no oficial) | `data/ugt.json`, se carga solo cuando se elige | 1.062 |

## Fiabilidad de las claves (auditoría del 25-09-2026)

Cada respuesta se ha contrastado con el texto legal del temario: RD 223/2008, RD 842/2002, RD 337/2014, RCF Libro 1, Estudio de Calidad de la Energía, LO 3/2007, Ley 31/1995, RD 2395/2004, TREBEP cap. VI y Ley 53/1984. Primero pasó un verificador automático, que localiza el pasaje y puntúa cada opción. Después revisé a mano todas las discrepancias.

- **UGT, parte específica** (900 preguntas): plantilla UGT contrastada con el texto.
  - Clave corregida: RAT E2.35. La descarga de condensadores de más de 1 kV es en 10 min, no en 5.
  - Opción u enunciado corregidos: RAT E1.33 (diferencial o de cuba en más de 10 MVA) y RAT E1.56 (el IP 34D es de los cuadros de BT de CT).
  - Distractores ambiguos arreglados en REBT y RCF.
  - 3 preguntas de RCF con materia del Libro 2 sustituidas por preguntas del Libro 1.
- **UGT, simulacros de parte común** (162 tras la limpieza): sin plantilla original. La clave es propia y está verificada artículo por artículo.
  - Eliminadas las 18 preguntas de LPRL de los capítulos II y IV, que no entran en el temario 2026.
  - Reformuladas 3 preguntas ambiguas y corregidas 2 con opciones duplicadas o que faltaban.
- **Oficiales**:
  - Claves revisadas: esp23-3, esp24-16 y esp24-17.
  - Enunciado corregido: gen24-43.
  - Eliminadas ing23-35 y ing24-32, porque les falta el cartel o el diálogo original.
  - gen24-46 queda solo en Estudio: con las opciones resumidas, las cuatro figuran en la ley.
- El campo `conf` indica el origen de la clave: `K` plantilla UGT, `V` clave propia verificada, `F` corregida o reformulada (con `note`).

## Sistema de aprendizaje

- **Repaso**: repetición espaciada tipo Leitner con intervalos de 1, 3, 7, 16 y 35 días. Primero salen los repasos vencidos y después 20 nuevas. Un fallo devuelve la pregunta al repaso de hoy.
- **Todas**: todas las preguntas del filtro, una vez por ciclo.
- **Simulacro**: 20, 40, 60 o 100 preguntas, a 1 minuto por pregunta, sin corrección hasta entregar. Nota sin penalización (bases 2026), desglose por tema y repaso de los fallos.
- **Progreso**: objetivo diario de 40 preguntas, racha, repasos pendientes y «Dónde fallas más», con acceso directo para practicar ese subtema.

## Formato de `data/ugt.json` (schema 2)
```json
{
  "schema": 2, "id": "ugt", "name": "UGT Entre Raíles",
  "topics": [{"id":"RLAT","bloque":"ESP","short":"RLAT","name":"RD 223/2008 — ..."}],
  "sets":   [{"id":"RLAT-E1","name":"RLAT · Examen 1","topic":"RLAT"}],
  "conf":   {"K":"...","V":"...","F":"..."},
  "questions": [{
    "id":"ugt-rlat-e1-02", "topic":"RLAT", "sub":"Articulado del Reglamento",
    "q":"...", "opts":["a","b","c","d"], "ans":3,
    "ref":"art. 2.1", "conf":"K", "note":"(opcional)",
    "origin":"RLAT · Examen 1 · P2", "set":"RLAT-E1", "n":2
  }]
}
```
Las preguntas oficiales admiten además `ref`, `note` y `hold` (`hold: true` significa que la pregunta queda fuera de los tests).
Si cambias los datos, sube la versión de `CACHE` en `sw.js` para que los móviles descarguen la versión nueva.

## Progreso guardado
Se guarda en `localStorage` con dos claves: `adif-oep-2026-v1` (por pregunta: aciertos, fallos, caja y fecha de repaso) y `adif-oep-2026-log` (actividad diaria). El progreso de versiones anteriores se convierte solo.
