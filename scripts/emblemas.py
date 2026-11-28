#!/usr/bin/env python3
"""
Genera los emblemas de los dioses (public/images/mundo/emblema_<elemento>.webp, 256 px)
a partir de los elementos individuales del diseñador (_assets_backup/images/mundo/elementos/):
cada elemento sobre un disco del color que tenía en el diagrama de Puntos Tonal, con contorno.

    python3 scripts/emblemas.py

Asignación confirmada por el diseñador: luz Tonatli, obscuridad Calti, rayo Tohui,
tierra Tzal, aire Heka, fuego Zilo, agua Lok (ver `emblemas` en lib/site.ts).
Requiere Pillow.
"""
from pathlib import Path
from PIL import Image, ImageDraw

RAIZ = Path(__file__).resolve().parent.parent
ORIGEN = RAIZ / "_assets_backup" / "images" / "mundo" / "elementos"
DESTINO = RAIZ / "public" / "images" / "mundo"
LADO = 256          # tamaño final
ESCALA = 4          # se dibuja más grande para suavizar bordes
OCUPA = 0.84        # lado mayor del elemento respecto al diámetro
CONTORNO = (20, 20, 20)

# Color del disco de cada elemento, tomado del diagrama de Puntos Tonal.
DISCO = {
    "luz": (244, 212, 44),
    "obscuridad": (106, 62, 150),
    "rayo": (84, 100, 126),
    "tierra": (116, 76, 36),
    "aire": (70, 122, 162),
    "fuego": (132, 50, 38),
    "agua": (52, 130, 130),
}

for elemento, color in DISCO.items():
    g = LADO * ESCALA
    borde = int(g * 0.022)
    disco = (borde, borde, g - 1 - borde, g - 1 - borde)
    capa = Image.new("RGBA", (g, g), color + (255,))
    arte = Image.open(ORIGEN / f"elemento_{elemento}.webp").convert("RGBA")
    arte = arte.crop(arte.getchannel("A").getbbox())
    k = OCUPA * g / max(arte.size)
    arte = arte.resize((round(arte.width * k), round(arte.height * k)), Image.LANCZOS)
    capa.alpha_composite(arte, ((g - arte.width) // 2, (g - arte.height) // 2))
    # Lo que sobresale del disco se recorta, como en el diagrama.
    mascara = Image.new("L", (g, g), 0)
    ImageDraw.Draw(mascara).ellipse(disco, fill=255)
    lienzo = Image.new("RGBA", (g, g), (0, 0, 0, 0))
    ImageDraw.Draw(lienzo).ellipse((1, 1, g - 2, g - 2), fill=CONTORNO)
    lienzo.paste(capa, (0, 0), mascara)
    lienzo.resize((LADO, LADO), Image.LANCZOS).save(DESTINO / f"emblema_{elemento}.webp", "WEBP", quality=92, method=6)

print("Emblemas listos.")
