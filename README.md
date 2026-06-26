<div align="center">

<br>

```
 █████╗ ██╗     ██╗██████╗  █████╗ ██╗          ███╗   ███╗ █████╗ ██████╗ 
██╔══██╗██║     ██║██╔══██╗██╔══██╗██║          ████╗ ████║██╔══██╗██╔══██╗
███████║██║     ██║██████╔╝███████║██║          ██╔████╔██║███████║██████╔╝
██╔══██║██║     ██║██╔══██╗██╔══██║██║          ██║╚██╔╝██║██╔══██║██╔═══╝ 
██║  ██║███████╗██║██║  ██╗██║  ██║███████╗     ██║ ╚═╝ ██║██║  ██║██║     
╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     
```

<br>

**Plataforma colaborativa de emergencias en tiempo real**

*Ciudadanos reportan · Comunidades responden · Vidas se salvan*

<br>

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

<br>

`Bucaramanga · Santander · Colombia`

<br>

</div>

---

## Stack tecnológico

### Frontend

| Tecnología | Versión | Rol |
|---|:---:|---|
| React | 18 | UI declarativa basada en componentes |
| Vite | 5 | Bundler y servidor de desarrollo con HMR |
| TypeScript | 5 | Tipado estático en todo el proyecto |
| Tailwind CSS | 3 | Estilos utility-first, enfoque mobile-first |

### Mapa

| Tecnología | Rol |
|---|---|
| Leaflet.js | Motor de mapa interactivo, open source |
| React-Leaflet | Bindings de Leaflet para React |
| OpenStreetMap | Tiles del mapa — gratuitos, sin API key |

### Backend · Supabase

| Servicio | Rol |
|---|---|
| PostgreSQL | Base de datos relacional — tablas `reports` y `profiles` |
| Supabase Auth | Autenticación con email/contraseña, sesión JWT |
| Supabase Realtime | WebSockets — reportes nuevos aparecen sin recargar |
| Supabase Storage | Imágenes adjuntas a reportes _(fase 2)_ |
| Row Level Security | Políticas de acceso a nivel de fila en PostgreSQL |

### APIs y plataformas

| Capa | Tecnología | Rol |
|---|---|---|
| Geolocalización | Browser Geolocation API | Captura coordenadas GPS del usuario |
| Deploy frontend | Vercel | CI/CD automático desde GitHub, HTTPS incluido |
| Deploy backend | Supabase Cloud | Base de datos, auth y realtime gestionados |
| Dev local | Docker + nginx | Entorno estandarizado y build de producción |

---

## Categorías de reporte

| Categoría | Descripción |
|---|---|
| 🍱 Alimentos | Punto de distribución de comida |
| 💧 Agua | Agua potable disponible |
| 🏠 Refugio | Albergue o lugar seguro |
| 🏥 Médico | Atención médica o primeros auxilios |
| ⚠ Peligro | Zona de riesgo general |
| 🚧 Vía bloqueada | Carretera o calle interrumpida |
| 🚁 Rescate | Operación de rescate en curso |
| 🆘 SOS | Emergencia activa, se necesita ayuda urgente |

---

## Estructura del proyecto

```
aliral/
│
├── src/
│   ├── components/
│   │   ├── auth/           LoginForm · RegisterForm
│   │   ├── map/            EmergencyMap · CategoryFilter
│   │   ├── reports/        ReportForm
│   │   ├── layout/         Navbar
│   │   └── ui/             LoadingSpinner
│   │
│   ├── pages/
│   │   ├── MapPage.tsx     Página principal — mapa, filtros y FAB
│   │   └── AuthPage.tsx    Overlay de login y registro
│   │
│   ├── hooks/
│   │   ├── useAuth.ts      Sesión del usuario + listener Supabase Auth
│   │   └── useReports.ts   Reportes + Realtime + geolocalización
│   │
│   ├── services/
│   │   ├── supabase.ts     Inicialización del cliente
│   │   ├── auth.ts         signUp · signIn · signOut · getCurrentUser
│   │   └── reports.ts      getActiveReports · createReport · confirmReport
│   │
│   ├── constants/          Metadatos de categorías · coordenadas Bucaramanga
│   ├── types/              Report · CreateReportPayload · UserProfile
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
├── Dockerfile              Multi-stage: dev → builder → production (nginx)
├── docker-compose.yml      Entorno de desarrollo local
├── nginx.conf              Configuración nginx para SPA
├── index.html
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores antes de levantar el proyecto.

| Variable | Dónde obtenerla |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → **Project URL** |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → **anon / public** |

> ⚠ Nunca subas `.env` al repositorio — el `.gitignore` ya lo excluye.

---

## Cómo ejecutar el proyecto

Docker es obligatorio. No se requiere tener Node ni npm instalados en el host.

**Requisitos**

| Herramienta | Descarga |
|---|---|
| Docker Desktop | https://www.docker.com/products/docker-desktop |
| Git | https://git-scm.com |

---

### 1 · Clonar el repositorio

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

---

### 2 · Configurar las variables de entorno

**Linux / macOS**
```bash
cp .env.example .env
```

**PowerShell**
```powershell
Copy-Item .env.example .env
```

Abre `.env` y pega tus keys de Supabase.

---

### 3 · Levantar el entorno de desarrollo

**Linux / macOS**
```bash
docker compose up
```

**PowerShell**
```powershell
docker compose up
```

Abre **http://localhost:5173** en el navegador.

> La primera vez tarda más — Docker instala las dependencias dentro del contenedor.

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

### Build de producción

Las variables `VITE_*` se incluyen en el bundle durante el build.  
Reemplaza los valores con tus keys reales de Supabase antes de ejecutar.

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

Abre **http://localhost** en el navegador.
