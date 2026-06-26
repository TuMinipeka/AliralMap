# Aliral — Información colaborativa en emergencias

Plataforma web colaborativa tipo "Waze de emergencias": ciudadanos reportan recursos y peligros geolocalizados en tiempo real durante desastres naturales o crisis urbanas. Los reportes aparecen en el mapa de todos los usuarios al instante, sin recargar la página.

**Cobertura inicial:** Bucaramanga, Santander, Colombia

---

## Stack tecnológico

### Frontend

| Tecnología | Versión | Rol |
|---|---|---|
| [React](https://react.dev) | 18 | UI declarativa basada en componentes |
| [Vite](https://vitejs.dev) | 5 | Bundler y servidor de desarrollo con HMR |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipado estático en todo el proyecto |
| [Tailwind CSS](https://tailwindcss.com) | 3 | Estilos utility-first, mobile-first |

### Mapa

| Tecnología | Rol |
|---|---|
| [Leaflet.js](https://leafletjs.com) | Motor de mapa interactivo (open source) |
| [React-Leaflet](https://react-leaflet.js.org) | Bindings de Leaflet para React |
| [OpenStreetMap](https://www.openstreetmap.org) | Tiles del mapa (gratuitos, sin API key) |

### Backend — Supabase

| Servicio | Rol |
|---|---|
| **PostgreSQL** | Base de datos relacional — tabla `reports` y `profiles` |
| **Supabase Auth** | Autenticación con email/contraseña, sesión JWT |
| **Supabase Realtime** | WebSockets — los nuevos reportes aparecen en el mapa sin refresh |
| **Supabase Storage** | Almacenamiento de imágenes adjuntas a reportes (fase 2) |
| **Row Level Security** | Políticas de acceso a nivel de fila en PostgreSQL |

### APIs del navegador

| API | Rol |
|---|---|
| [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) | Captura las coordenadas GPS del usuario para geolocalizar el reporte |

### Infraestructura y deploy

| Plataforma | Rol |
|---|---|
| [Vercel](https://vercel.com) | Deploy automático del frontend desde GitHub, HTTPS incluido |
| [Supabase Cloud](https://supabase.com) | Backend gestionado — base de datos, auth y realtime en la nube |
| [Docker](https://www.docker.com) | Entorno de desarrollo local estandarizado (obligatorio) |
| [nginx](https://nginx.org) | Servidor de la imagen de producción Docker |

---

## Categorías de reporte

| Emoji | Categoría | Descripción |
|---|---|---|
| 🍱 | Alimentos | Punto de distribución de comida |
| 💧 | Agua | Agua potable disponible |
| 🏠 | Refugio | Albergue o lugar seguro |
| 🏥 | Médico | Atención médica o primeros auxilios |
| ⚠️ | Peligro | Zona de riesgo general |
| 🚧 | Vía bloqueada | Carretera o calle interrumpida |
| 🚁 | Rescate | Operación de rescate en curso |
| 🆘 | SOS | Emergencia activa, se necesita ayuda urgente |

---

## Estructura del proyecto

```
aliral/
├── src/
│   ├── components/
│   │   ├── auth/          # LoginForm, RegisterForm
│   │   ├── map/           # EmergencyMap (Leaflet), CategoryFilter
│   │   ├── reports/       # ReportForm (modal de nuevo reporte)
│   │   ├── layout/        # Navbar
│   │   └── ui/            # LoadingSpinner
│   ├── pages/
│   │   ├── MapPage.tsx    # Página principal — mapa + FAB + filtros
│   │   └── AuthPage.tsx   # Overlay de login / registro
│   ├── hooks/
│   │   ├── useAuth.ts     # Sesión del usuario + listener Supabase Auth
│   │   └── useReports.ts  # Reportes + suscripción Realtime + geolocalización
│   ├── services/
│   │   ├── supabase.ts    # Inicialización del cliente Supabase
│   │   ├── auth.ts        # signUp / signIn / signOut / getCurrentUser
│   │   └── reports.ts     # getActiveReports / createReport / confirmReport
│   ├── constants/
│   │   └── categories.ts  # Metadatos de categorías + coordenadas Bucaramanga
│   ├── types/
│   │   └── index.ts       # Report, CreateReportPayload, UserProfile
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── Dockerfile             # Multi-stage: dev → builder → production (nginx)
├── docker-compose.yml     # Entorno de desarrollo local
├── nginx.conf             # Configuración nginx para SPA
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz a partir de `.env.example`:

| Variable | Dónde obtenerla |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → **Project URL** |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → **anon / public** |

> Nunca subas `.env` al repositorio. El `.gitignore` ya lo excluye.

---

## Cómo ejecutar el proyecto

> **Docker es obligatorio.** No se necesita Node ni npm instalados en el host.

### Requisitos

| Herramienta | Descarga |
|---|---|
| Docker Desktop | https://www.docker.com/products/docker-desktop |
| Git | https://git-scm.com |

### 1. Clonar el repositorio

**Linux / macOS**
```bash
git clone https://github.com/tu-usuario/aliral.git
cd aliral
```

**PowerShell**
```powershell
git clone https://github.com/tu-usuario/aliral.git
cd aliral
```

### 2. Configurar las variables de entorno

**Linux / macOS**
```bash
cp .env.example .env
```

**PowerShell**
```powershell
Copy-Item .env.example .env
```

Abre `.env` y rellena los valores con tus keys de Supabase.

### 3. Levantar el entorno de desarrollo

**Linux / macOS**
```bash
docker compose up
```

**PowerShell**
```powershell
docker compose up
```

Abre el navegador en: **http://localhost:5173**

Para detenerlo:

**Linux / macOS**
```bash
docker compose down
```

**PowerShell**
```powershell
docker compose down
```

---

## Build de producción con Docker

Las variables `VITE_*` se incluyen en el bundle durante el build. Reemplaza los valores antes de ejecutar.

**Linux / macOS**
```bash
docker build \
  --target production \
  --build-arg VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co \
  --build-arg VITE_SUPABASE_ANON_KEY=eyJhbGci... \
  -t aliral:latest .

docker run -p 80:80 aliral:latest
```

**PowerShell**
```powershell
docker build `
  --target production `
  --build-arg VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co `
  --build-arg VITE_SUPABASE_ANON_KEY=eyJhbGci... `
  -t aliral:latest .

docker run -p 80:80 aliral:latest
```

Abre el navegador en: **http://localhost**
