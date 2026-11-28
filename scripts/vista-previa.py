#!/usr/bin/env python3
"""
Genera las imagenes que se ven al compartir un enlace (Open Graph, 1200x630) y
los iconos del sitio. Correr al agregar arte de una especie o deidad nueva:

    python3 scripts/vista-previa.py

- public/images/piramides_azteca_final_og.jpg: imagen general (arte del Hero + logo).
- <arte>_og.jpg junto a cada retrato de especie y deidad: su arte sobre selva con
  el brillo del color de su dios (los mismos de deityThemes en lib/site.ts).
- <ilustracion>_og.jpg de las paginas en PAGINAS (p. ej. la Cosmovision para El Mundo).
Las vistas previas son JPG (excepcion a la regla de .webp, para WhatsApp).
- public/images/tonaltlan_logo_icono_{48,180,192,512}.webp: la T del logo sobre selva.
Si a una ficha le falta su _og, la pagina usa la imagen general (lib/vista-previa.ts).
Requiere Pillow (pip install pillow).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
IMG = RAIZ / "public" / "images"
W, H = 1200, 630
# Vista previa en JPG: excepcion a la regla de .webp para que WhatsApp siempre la muestre.
JPG = {"format": "JPEG", "quality": 82, "optimize": True, "progressive": True}  # < 300 KB para WhatsApp
SELVA = (11, 29, 25)  # selva-900

# Color de cada deidad (hex de deityThemes) y a que deidad pertenece cada especie.
COLOR = {"heka": "#38bdf8", "lok": "#22d3ee", "tzal": "#a3e635", "zilo": "#fb923c",
         "calti": "#a78bfa", "tonatli": "#fde047", "tohui": "#e879f9", None: "#4ade80"}
ESPECIES = {"Hekari": "heka", "Hualik": "calti", "Irzak": "zilo", "Lok-Naa": "lok",
            "Quinametzin": "tzal", "Tohkari": "tohui", "Ton": "tonatli", "Tlaca": None}
DEIDADES = {"Heka": "heka", "Lok": "lok", "Tzal": "tzal", "Zilo": "zilo",
            "Calti": "calti", "Tonatli": "tonatli", "Tohui": "tohui"}


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def recortar(im):
    return im.crop(im.getchannel("A").getbbox())


def brillo(color, centro, radio, alfa):
    capa = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(capa)
    cx, cy = centro
    for i in range(radio, 0, -6):
        d.ellipse((cx - i, cy - i, cx + i, cy + i), fill=color + (int(alfa * (1 - i / radio) ** 1.6),))
    return capa.filter(ImageFilter.GaussianBlur(24))


def ancho(im, w):
    return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)


logo = recortar(Image.open(IMG / "tonaltlan_logo.webp").convert("RGBA"))

# 1) Imagen general
fondo = Image.open(IMG / "piramides_azteca_final.webp").convert("RGB")
k = max(W / fondo.width, H / fondo.height)
fondo = fondo.resize((round(fondo.width * k), round(fondo.height * k)), Image.LANCZOS)
x, y = (fondo.width - W) // 2, int((fondo.height - H) * 0.35)
fondo = fondo.crop((x, y, x + W, y + H)).convert("RGBA")
velo = Image.new("RGBA", (W, H), SELVA + (0,))
dv = ImageDraw.Draw(velo)
for yy in range(H):
    dv.line((0, yy, W, yy), fill=SELVA + (int(70 + 120 * yy / H),))
fondo = Image.alpha_composite(fondo, velo)
l = ancho(logo, 760)
fondo.alpha_composite(l, ((W - l.width) // 2, (H - l.height) // 2))
fondo.convert("RGB").save(IMG / "piramides_azteca_final_og.jpg", **JPG)

# 2) Fichas: arte centrado (WhatsApp recorta un cuadrado al centro)
logo_chico = ancho(logo, 230)


def tarjeta(arte_path, deidad):
    lienzo = Image.alpha_composite(Image.new("RGBA", (W, H), SELVA + (255,)),
                                   brillo(rgb(COLOR[deidad]), (W / 2, H * 0.55), 520, 150))
    arte = recortar(Image.open(arte_path).convert("RGBA"))
    k = min(600 / arte.width, 560 / arte.height)
    arte = arte.resize((round(arte.width * k), round(arte.height * k)), Image.LANCZOS)
    lienzo.alpha_composite(arte, (int(W / 2 - arte.width / 2), H - arte.height - 24))
    lienzo.alpha_composite(logo_chico, (48, 48))
    lienzo.convert("RGB").save(arte_path.with_name(arte_path.stem + "_og.jpg"), **JPG)


for nombre, deidad in ESPECIES.items():
    tarjeta(IMG / "especies" / f"{nombre}_retrato.webp", deidad)
for nombre, deidad in DEIDADES.items():
    tarjeta(IMG / f"{nombre}.webp", deidad)

# 3) Paginas con ilustracion propia: centro recortado a 1200x630 con el logo chico.
#    (El Mundo usa la Cosmovision; ver metadataMundo en components/paginas/Mundo.tsx.)
PAGINAS = ["galeria/cosmovision.webp"]
for rel in PAGINAS:
    origen = IMG / rel
    im = Image.open(origen).convert("RGB")
    k = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    im = im.crop((x, y, x + W, y + H)).convert("RGBA")
    im.alpha_composite(logo_chico, (48, 48))
    im.convert("RGB").save(origen.with_name(origen.stem + "_og.jpg"), **JPG)

# 4) Iconos: la T simplificada del logo (tonaltlan_logo_t.webp, del diseñador) sobre selva.
letra = recortar(Image.open(IMG / "tonaltlan_logo_t.webp").convert("RGBA"))
for lado in (48, 180, 192, 512):
    lienzo = Image.new("RGBA", (lado, lado), SELVA + (255,))
    alto = int(lado * 0.8)
    l = letra.resize((round(letra.width * alto / letra.height), alto), Image.LANCZOS)
    lienzo.alpha_composite(l, ((lado - l.width) // 2, (lado - l.height) // 2))
    lienzo.convert("RGB").save(IMG / f"tonaltlan_logo_icono_{lado}.webp", "WEBP", quality=92, method=6)

print("Vistas previas e iconos listos.")
