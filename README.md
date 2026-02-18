# Tonaltlan Landing

Una landing page épica y moderna para **Tonaltlan** — una novela interactiva de rol y aventura ambientada en un mundo mesoamericano fantástico.

## 🎨 Características Visuales

- **Diseño Glass Morphism**: Contenedor transparente con efecto cristal y backdrop blur
- **Fondo Aurora Épico**: Gradientes dinámicos + imagen de islas flotantes con arquitectura azteca
- **Tipografía Premium**: Cinzel para títulos (serif elegante) + Inter para cuerpo (sans-serif limpio)
- **Responsivo Mobile-First**: Optimizado para todos los tamaños de pantalla (360px—1440px+)
- **Accesibilidad**: Focus states, `prefers-reduced-motion`, dimensiones de imagen explícitas

## 📁 Estructura de Archivos

```
tonaltlan-landing/
├── index.html                    # Archivo principal (HTML + CSS inline)
├── tonaltlan_logo.png            # Logo principal (3840×2160px, 2.4MB)
├── produccion.png                # Logo de Cuevas & Quetzales (3840×2160px, 1.4MB)
├── piramides_azteca_final.png    # Fondo épico flotante (4628×2576px)
├── CNAME                         # Configuración de dominio GitHub Pages
└── README.md                     # Este archivo
```

## 🚀 Despliegue

La landing está configurada para **GitHub Pages** en el branch `main`.

### URL en vivo
```
https://tonaltlan-landing.github.io
```
(O tu dominio personalizado configurado en `CNAME`)

## 🎯 Secciones

### Hero
- Logo principal de Tonaltlan (grande, interactivo con hover)
- Badge "Sitio oficial · En construcción"
- Título "Próximamente" con texto shadow épico
- Tagline: "El mundo de Tonaltlan te espera."

### Contactos
Tres cards con roles y acciones:
1. **Arquitecto Tonal** (CEO)
2. **Guarda Códices** (Editor)
3. **Tecnomante** (Tech)

Cada card incluye:
- Rol + Badge corto
- Email de contacto
- Botón "Escribir" con icono SVG

### Producción
Footer sutil con:
- Logo de **Cuevas & Quetzales** (discreto pero prominente)
- Texto: "Una producción de Cuevas & Quetzales"

## 🛠️ Tecnología

- **HTML5** semántico con ARIA labels
- **CSS3** moderno: CSS variables, `clamp()`, `min()`, gradientes, backdrop-filter
- **Sin dependencias externas** (excepto Google Fonts)
- **Fuentes**: Cinzel (Google Fonts), Inter (Google Fonts)

## 📊 Optimización

### Imágenes
- Dimensiones explícitas (`width` / `height`) para prevenir layout shift
- Resolución alta (3840×2160px) para pantallas retina
- Formatos PNG optimizados

**Recomendación**: Convertir a WebP para mejorar velocidad de carga:
```bash
cwebp -q 85 tonaltlan_logo.png -o tonaltlan_logo.webp
cwebp -q 85 produccion.png -o produccion.webp
cwebp -q 85 piramides_azteca_final.png -o piramides_azteca_final.webp
```

### Performance
- Backdrop blur: `16px` (degradable con `@supports`)
- Opacidad de fondo: `0.72` para visibilidad óptima
- Transiciones suaves: `0.22s—0.35s` ease
- `prefers-reduced-motion` para accesibilidad

## 📱 Responsive

| Breakpoint | Comportamiento |
|-----------|----------------|
| **360px** | 1 columna cards, padding ajustado |
| **768px** | Layout aún compacto |
| **920px** | Ancho máximo del container |
| **1440px+** | Centrado con espacio lateral |

## 🎨 Paleta de Colores

```css
--bg: #07070a                    /* Fondo oscuro épico */
--text: #e6edf7                  /* Texto principal claro */
--gold: #c5a059                  /* Dorado principal */
--goldSoft: rgba(232,207,141)    /* Dorado suave */
--aqua: #2dd4bf                  /* Cian/turquesa */
```

## ✨ Efectos Interactivos

### Logo principal
- Hover: `translateY(-2px) scale(1.01)` + shadow más intenso

### Cards de contacto
- Hover: `translateY(-3px)` + borde aqua + background más opaco

### Botones de acción
- Hover: `translateY(-1px)` + background más brillante + borde aqua

### Logo de producción
- Hover: `translateY(-2px) scale(1.01)` + opacity → 1

## 🔧 Customización

### Cambiar opacidad del fondo épico
Busca en `index.html` la regla `main::before`:
```css
opacity: .72;  /* Aumenta a .85+ para más presencia */
```

### Ajustar blur del container
```css
backdrop-filter: blur(16px);  /* Cambia el valor de blur */
```

### Modificar tamaño del logo principal
```css
.logo {
  width: min(600px, 94%);  /* Ajusta 600px según necesidad */
}
```

## 📧 Contacto

- **Arquitecto Tonal (CEO)**: arquitectotonal@tonaltlan.com
- **Guarda Códices (Editor)**: guardacodices@tonaltlan.com
- **Tecnomante (Tech)**: tecnomante@tonaltlan.com

## 📄 Licencia

Tonaltlan es una producción de **Cuevas & Quetzales**.

---

**Última actualización**: 17 de febrero de 2026
