# Adif · Simulador OEP 2026

PWA de estudio para el perfil 26/11PO Montador Eléctrico IISS. Funciona offline (service worker) y guarda el progreso en el navegador.

## Fuentes de preguntas

La app tiene dos fuentes separadas. Se cambia con el selector de arriba.

| Fuente | Archivo | Preguntas | Clave |
|---|---|---|---|
| Oficiales Adif 2023–2025 | embebidas en `index.html` (`QUESTIONS`) | 162 | Oficial |
| UGT Entre Raíles (no oficial) | `data/ugt.json`, carga diferida | 1.080 | Ver abajo |

### Banco UGT Entre Raíles
- **Parte específica:** 900 preguntas de 15 cuadernillos por tema (RLAT, REBT, RAT, RCF L1 y Calidad de la energía, 180 cada uno). Usan la plantilla de UGT.
- **Parte común:** 180 preguntas de los simulacros I–III. No traían plantilla, así que la clave es propia. Cada pregunta indica su nivel de confianza en `conf`:
  - `V`: verificada con el texto legal (140).
  - `A`: confianza alta (32).
  - `M`: dudosa (6).
  - `B`: ambigua (2).
- 18 preguntas de PRL (caps. II y IV) no entran en el temario 2026. Están marcadas con `out: true` y se excluyen por defecto.
- Filtros: bloque, tema, subtema (ITC, apartado o artículo), cuadernillo original, falladas y fuera de temario.

### Formato de `data/ugt.json` (schema 1)
```json
{
  "schema": 1, "id": "ugt", "name": "UGT Entre Raíles",
  "topics": [{"id":"RLAT","bloque":"ESP","short":"RLAT","name":"RD 223/2008 — ..."}],
  "sets":   [{"id":"RLAT-E1","name":"RLAT · Examen 1","topic":"RLAT"}],
  "conf":   {"K":"Plantilla UGT","V":"Verificada", "...": "..."},
  "questions": [{
    "id":"ugt-rlat-e1-02", "topic":"RLAT", "sub":"Articulado del Reglamento",
    "q":"...", "opts":["a","b","c","d"], "ans":3,
    "ref":"art. 2.1", "conf":"K", "out":false, "note":"",
    "origin":"RLAT · Examen 1 · P2", "set":"RLAT-E1", "n":2, "variants":[]
  }]
}
```
Para añadir más preguntas UGT, amplía `questions` con este formato (ids únicos) y sube la versión de `CACHE` en `sw.js` para que los móviles descarguen el archivo nuevo.

## Progreso
Se guarda en `localStorage` con la clave `adif-oep-2026-v1`, por id de pregunta. Las dos fuentes comparten el mismo almacén porque sus ids no coinciden. Una pregunta pasa a "dominada" tras 2 aciertos y vuelve a repaso con un fallo.
