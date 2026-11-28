#!/usr/bin/env python3
"""
Genera versiones ligeras de las imagenes del sitio (el export estatico de Next
no redimensiona imagenes). Correr despues de agregar o cambiar imagenes:

    python3 scripts/variantes.py

- Crea <nombre>-480.webp y <nombre>-1200.webp junto a cada imagen de
  public/images/ (y <nombre>-1800.webp para la galeria, que se ve en grande).
- No toca los originales. Solo reduce si la variante es mas chica que el original.
- Si el original es mas angosto que el ancho mayor pero pesa de mas (mas de
  150 KB), la variante mayor conserva su tamano y solo se comprime: asi una
  ilustracion chica pero pesada tampoco se descarga completa.
- Escribe lib/variantes.generated.ts con la lista de variantes disponibles;
  el codigo la usa a traves de variante() en lib/imagenes.ts.
Requiere Pillow (pip install pillow).
"""
import re
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
IMAGENES = RAIZ / "public" / "images"
SALIDA_TS = RAIZ / "lib" / "variantes.generated.ts"
ANCHOS = (480, 1200)
ANCHOS_GALERIA = (480, 1200, 1800)
CALIDAD = 82
# Un original mas angosto que el ancho mayor se comprime si pesa mas que esto...
PESADA = 150 * 1024
# ...y la version comprimida solo se usa si ahorra al menos este porcentaje.
AHORRO_MINIMO = 0.25
# No se muestran en distintos tamanos, o solo los usa un script como fuente
# (vista-previa.py: el arte del Hero, el logo y la T de los iconos).
OMITIR = {"tonaltlan_logo_nav", "produccion_footer", "tonaltlan_logo_t", "tonaltlan_logo", "piramides_azteca_final"}
# Versiones derivadas con su ancho en el nombre (tonaltlan_logo_1200, produccion_footer_675):
# ya tienen su tamano final.
TAMANO_FINAL = re.compile(r"_\d{2,}$")  # dos o más cifras: "Piramide_onix_color_final_1" no es un ancho


def es_variante(p: Path) -> bool:
    return p.stem.rsplit("-", 1)[-1] in {str(a) for a in ANCHOS_GALERIA}


def se_omite(p: Path) -> bool:
    # _og (vista previa al compartir) e _icono_N (iconos) tambien tienen su tamano final.
    return (
        es_variante(p)
        or p.stem in OMITIR
        or TAMANO_FINAL.search(p.stem) is not None
        or p.stem.endswith("_og")
        or "_icono_" in p.stem
    )


def vigente(destino: Path, original: Path) -> bool:
    return destino.exists() and destino.stat().st_mtime >= original.stat().st_mtime


registro: dict[str, list[int]] = {}
for original in sorted(IMAGENES.rglob("*.webp")):
    if se_omite(original):
        continue
    anchos = ANCHOS_GALERIA if "galeria" in original.parts else ANCHOS
    with Image.open(original) as im:
        generados = []
        for ancho in anchos:
            destino = original.with_name(f"{original.stem}-{ancho}.webp")
            if im.width > ancho:
                if not vigente(destino, original):
                    alto = round(im.height * ancho / im.width)
                    im.resize((ancho, alto), Image.LANCZOS).save(destino, "WEBP", quality=CALIDAD, method=6)
                generados.append(ancho)
            elif ancho == anchos[-1] and original.stat().st_size > PESADA:
                # Mas angosto que el ancho mayor y pesado: misma medida, comprimido.
                if not vigente(destino, original):
                    im.save(destino, "WEBP", quality=CALIDAD, method=6)
                if destino.stat().st_size <= original.stat().st_size * (1 - AHORRO_MINIMO):
                    generados.append(ancho)
                else:
                    destino.unlink()
    if generados:
        ruta = "/" + original.relative_to(RAIZ / "public").as_posix()
        registro[ruta] = generados

lineas = ",\n".join(f'  "{ruta}": [{", ".join(map(str, a))}]' for ruta, a in registro.items())
SALIDA_TS.write_text(
    "// Generado por scripts/variantes.py. No editar a mano.\n"
    "export const variantesDisponibles: Record<string, number[]> = {\n" + lineas + ",\n};\n"
)
print(f"{len(registro)} imagenes con variantes -> {SALIDA_TS.relative_to(RAIZ)}")
