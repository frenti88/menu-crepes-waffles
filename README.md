# Crepes & Waffles · Menú Digital Mobile

Menú digital para dispositivos móviles de **Crepes & Waffles**, optimizado para accesibilidad (WCAG AAA/AA), usabilidad táctil y con el 100% del contenido oficial del menú extraído de las 8 páginas de la carta.

## 📱 Características Principales

- **Contenido 100% Fiel**: 225 productos en 40 secciones y 8 categorías (Desayunos, Entradas y Sopas, Crepes Salados, Pitas y Panne Cook, Ensaladas, Bebidas, Crepes Dulces / Waffles / Helados y Crepes en Casa).
- **Diseño e Identidad de Marca**: Colores institucionales cálidos (crema marfil `#FAF6F0`, café espresso `#241610`, terracota `#A1371D` y dorado artesanal `#C08A3E`), tipografía editorial `Playfair Display` y `Plus Jakarta Sans`.
- **Navegación Sticky con Scroll-Spy**: Pestañas de categorías con auto-desplazamiento horizontal y sincronización visual al hacer scroll.
- **Filtros Dietéticos Rápidos**: Filtrado instantáneo por `🌱 Vegetariano`, `🌿 Vegano`, `🌾🚫 Opción Sin Gluten`, `🌶️ Picante` y `🥜 Nueces/Maní`.
- **Armador Interactivo de "Ensalada de la Barra"**: Personalizador táctil con los 24 ingredientes, 5 salsas y 5 complementos con validación de límites oficiales (máx. 12 ingredientes, 2 salsas, 3 complementos).
- **Buscador en Vivo**: Búsqueda instantánea con resaltado de coincidencias en tiempo real.
- **Mi Selección de Mesa / Calculadora**: Bottom sheet para registrar platos, calcular subtotales, estimar la propina sugerida (10%) y compartir la comanda con la mesa o por WhatsApp.
- **Accesibilidad (a11y)**: Cumplimiento de contraste WCAG AAA/AA, targets táctiles mínimos de 44-48px, roles y estados ARIA, soporte para lectores de pantalla y soporte de movimiento reducido (`prefers-reduced-motion`).

## 🛠️ Tecnologías

- HTML5 Semántico
- CSS3 Moderno (CSS Variables, Flexbox, Grid, Scroll-Snap, Backdrop-Filter)
- JavaScript ES Modules nativo (sin dependencias externas)
- Vercel Deployment

## 🚀 Ejecución Local

```bash
# Iniciar servidor local
npm start
# o
node server.js
```

Abre en tu navegador `http://localhost:3000`.
