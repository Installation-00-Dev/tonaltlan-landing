#!/usr/bin/env python3
"""
Genera versiones ligeras de las imagenes del sitio (el export estatico de Next
no redimensiona imagenes). Correr despues de agregar o cambiar imagenes:

    python3 scripts/variantes.py

- Crea <nombre>-480.webp y <nombre>-1200.webp junto a cada imagen de
  public/images/ (y <nombre>-1800.webp para la galeria, que se ve en grande).
- No toca los originales. Solo genera la variante si es mas chica que el original.
- Escribe lib/variantes.generated.ts con la lista de variantes disponibles;
  el codigo la usa a traves de variante() en lib/imagenes.ts.
Requiere Pillow (pip install pillow).
"""
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
IMAGENES = RAIZ / "public" / "images"
SALIDA_TS = RAIZ / "lib" / "variantes.generated.ts"
ANCHOS = (480, 1200)
ANCHOS_GALERIA = (480, 1200, 1800)
# Ya tienen el tamano adecuado o no se muestran en distintos tamanos.
OMITIR = {"tonaltlan_logo_nav", "produccion_footer", "tonaltlan_logo_1200", "piramides_azteca_final_1920", "instagram"}


def es_variante(p: Path) -> bool:
    return p.stem.rsplit("-", 1)[-1] in {str(a) for a in ANCHOS_GALERIA}


registro: dict[str, list[int]] = {}
for original in sorted(IMAGENES.rglob("*.webp")):
    if es_variante(original) or original.stem in OMITIR:
        continue
    anchos = ANCHOS_GALERIA if "galeria" in original.parts else ANCHOS
    with Image.open(original) as im:
        generados = []
        for ancho in anchos:
            if im.width <= ancho:
                continue
            destino = original.with_name(f"{original.stem}-{ancho}.webp")
            if not destino.exists() or destino.stat().st_mtime < original.stat().st_mtime:
                alto = round(im.height * ancho / im.width)
                im.resize((ancho, alto), Image.LANCZOS).save(destino, "WEBP", quality=82, method=6)
            generados.append(ancho)
    if generados:
        ruta = "/" + original.relative_to(RAIZ / "public").as_posix()
        registro[ruta] = generados

lineas = ",\n".join(f'  "{ruta}": [{", ".join(map(str, a))}]' for ruta, a in registro.items())
SALIDA_TS.write_text(
    "// Generado por scripts/variantes.py. No editar a mano.\n"
    "export const variantesDisponibles: Record<string, number[]> = {\n" + lineas + ",\n};\n"
)
print(f"{len(registro)} imagenes con variantes -> {SALIDA_TS.relative_to(RAIZ)}")
