# Prompt — Claude Code | Aliral MVP Frontend

---

## ROL

Eres un desarrollador frontend senior especializado en React + TypeScript con enfoque mobile-first. Tu trabajo es dejar la estructura base del proyecto lista, limpia y funcional para que el equipo pueda construir sobre ella sin fricciones.

---

## CONTEXTO DEL PROYECTO

**Aliral** es una plataforma web colaborativa de información en tiempo real para emergencias. Ciudadanos reportan recursos o peligros geolocalizados (agua, comida, refugios, zonas de riesgo) y el resto los ve en un mapa en tiempo real — como Waze, pero para salvar vidas.

- Web app **mobile-first** (no nativa)
- Cobertura inicial: Bucaramanga, Colombia
- Stack: React + Vite + TypeScript + Tailwind CSS + Leaflet + Supabase
- Equipo: 2 devs + 1 UX/UI | MVP en 5-6 horas

---

## OBJETIVO

Genera la estructura base del frontend del proyecto. No implementes lógica completa — deja archivos con su esqueleto (imports, tipos, funciones vacías con comentario `// TODO`) para que los desarrolladores continúen sobre ella.

**Prioridad total: frontend. El backend (Supabase) se conecta después.**

---

## ESTRUCTURA REQUERIDA

Crea exactamente esta estructura, ni más ni menos:

```
aliral/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── map/
│   │   │   ├── EmergencyMap.tsx
│   │   │   └── CategoryFilter.tsx
│   │   ├── reports/
│   │   │   └── ReportForm.tsx
│   │   ├── layout/
│   │   │   └── Navbar.tsx
│   │   └── ui/
│   │       └── LoadingSpinner.tsx
│   ├── pages/
│   │   ├── MapPage.tsx
│   │   └── AuthPage.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useReports.ts
│   ├── services/
│   │   ├── supabase.ts
│   │   ├── auth.ts
│   │   └── reports.ts
│   ├── constants/
│   │   └── categories.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## REGLAS DE IMPLEMENTACIÓN

1. **Cada archivo debe tener:**
   - Comentario de 1 línea explicando su responsabilidad
   - Imports necesarios
   - Tipos/interfaces definidos
   - Funciones/componentes con estructura vacía + `// TODO: implementar`

2. **Tailwind config** — paleta personalizada Aliral:
   ```js
   brand: {
     orange: '#F4621F',
     'orange-dark': '#C94D10',
     night: '#0F1117',
     'night-soft': '#1A1E2A',
     slate: '#2C3347',
   }
   ```

3. **types/index.ts** — define estos tipos completos (no TODO):
   ```ts
   type ReportCategory = 'food' | 'water' | 'shelter' | 'medical' | 'danger' | 'road' | 'rescue' | 'sos'
   interface Report { id, user_id, category, title, description, latitude, longitude, is_active, confirmations, created_at }
   interface CreateReportPayload { category, title, description?, latitude, longitude }
   ```

4. **constants/categories.ts** — define completo (no TODO):
   ```ts
   CATEGORY_META: Record<ReportCategory, { label, emoji, color, tailwind }>
   DEFAULT_CENTER: [7.1193, -73.1227]  // Bucaramanga
   DEFAULT_ZOOM: 13
   ```

5. **services/supabase.ts** — solo inicialización del cliente con variables de entorno, nada más.

6. **index.html** — incluir el CSS de Leaflet via CDN en el `<head>`.

7. **index.css** — base de Tailwind + override del `.leaflet-container` para fondo oscuro + clase `.scrollbar-hide`.

8. **mobile-first en todo**: cuando pongas clases Tailwind en los esqueletos, usa `sm:` para desktop, base para móvil.

9. **App.tsx** — estructura con estado `showAuth` y renderiza `<MapPage>` + `<AuthPage>` condicionalmente.

---

## README.md — estructura exacta a generar

El README debe tener exactamente estas secciones, en este orden, sin excesos:

```
# 🆘 Aliral

[Descripción en 2 líneas: qué es y para qué sirve]

## ¿Qué es este repositorio?
[Párrafo corto: contexto del proyecto, stack, equipo]

## Estructura del proyecto
[Árbol de carpetas con una línea explicando cada carpeta/archivo clave]

## Cómo ejecutar el proyecto

### Requisitos
[Node 18+, npm, cuenta Supabase]

### Pasos
[npm install → cp .env.example .env → llenar vars → npm run dev]

### Variables de entorno
[Tabla: variable | dónde obtenerla]

## Stack
[Tabla: capa | tecnología | por qué]
```

**No incluyas** sección de backend, SQL, RLS ni deploy en producción — eso va en otro documento.

---

## ENTREGABLE FINAL

Al terminar, ejecuta:
```bash
npm install
npm run build
```

Si el build pasa sin errores de TypeScript → estructura lista.
Si falla → corrige solo los errores de tipos, no agregues lógica.

