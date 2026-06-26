# 🆘 Aliral — Información colaborativa en emergencias

> Plataforma web colaborativa tipo "Waze de emergencias": ciudadanos reportan recursos y peligros geolocalizados en tiempo real durante desastres naturales o crisis urbanas.

**Cobertura inicial:** Bucaramanga, Santander, Colombia  
**Equipo:** 2 desarrolladores + 1 UX/UI  
**Tipo:** Web app responsive (Mobile-first)

---

## 🗂️ Estructura del proyecto

```
aliral/
│
├── public/                        # Archivos estáticos públicos
│   └── aliral-icon.svg            # Ícono de la app (favicon)
│
├── src/
│   │
│   ├── assets/
│   │   └── icons/                 # SVGs e íconos propios del diseño
│   │
│   ├── components/                # Componentes reutilizables de UI
│   │   │
│   │   ├── auth/                  # Todo lo relacionado con autenticación
│   │   │   ├── LoginForm.tsx      # Formulario de inicio de sesión
│   │   │   └── RegisterForm.tsx   # Formulario de registro de cuenta
│   │   │
│   │   ├── map/                   # Componentes del mapa interactivo
│   │   │   ├── EmergencyMap.tsx   # Mapa Leaflet con markers de reportes
│   │   │   └── CategoryFilter.tsx # Barra de filtros por categoría
│   │   │
│   │   ├── reports/               # Creación y visualización de reportes
│   │   │   └── ReportForm.tsx     # Modal para crear un nuevo reporte
│   │   │
│   │   ├── layout/                # Estructura visible de la app
│   │   │   └── Navbar.tsx         # Barra superior: logo, sesión, contador
│   │   │
│   │   └── ui/                    # Componentes genéricos de interfaz
│   │       └── LoadingSpinner.tsx # Spinner de carga reutilizable
│   │
│   ├── pages/                     # Vistas completas (cada "pantalla")
│   │   ├── MapPage.tsx            # Página principal — mapa + FAB + filtros
│   │   └── AuthPage.tsx           # Overlay de login/registro
│   │
│   ├── hooks/                     # Lógica reutilizable con estado React
│   │   ├── useAuth.ts             # Sesión del usuario + listener en tiempo real
│   │   └── useReports.ts          # Reportes + suscripción Realtime Supabase
│   │                              # También exporta: useGeolocation()
│   │
│   ├── services/                  # Capa de acceso a datos (única fuente de verdad)
│   │   ├── supabase.ts            # Inicialización del cliente Supabase
│   │   ├── auth.ts                # signUp / signIn / signOut / getCurrentUser
│   │   └── reports.ts             # getActiveReports / createReport / confirmReport
│   │
│   ├── constants/
│   │   └── categories.ts          # Metadatos de categorías (emoji, color, label)
│   │                              # + coordenadas por defecto de Bucaramanga
│   │
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript: Report, UserProfile, etc.
│   │
│   ├── utils/
│   │   └── time.ts                # timeAgo() — formato relativo de fechas
│   │
│   ├── App.tsx                    # Raíz de la app: routing de overlays
│   ├── main.tsx                   # Punto de entrada React + StrictMode
│   └── index.css                  # Estilos globales + config Tailwind + Leaflet
│
├── .env.example                   # Plantilla de variables de entorno (SIN secrets)
├── .gitignore                     # Excluye node_modules, .env, dist
├── index.html                     # HTML base — carga Leaflet CSS + app
├── package.json                   # Dependencias y scripts npm
├── tailwind.config.js             # Paleta de colores personalizada Aliral
├── tsconfig.json                  # Configuración TypeScript estricto
├── vite.config.ts                 # Vite + alias @ → src/
└── postcss.config.js              # PostCSS para Tailwind
```

---

## 🛠️ Stack tecnológico

| Capa | Tecnología | Por qué |
|---|---|---|
| **Frontend** | React 18 + Vite | Desarrollo rápido, HMR instantáneo |
| **Estilos** | Tailwind CSS | Mobile-first sin escribir CSS propio |
| **Mapa** | Leaflet + react-leaflet | 100% gratuito, tiles OpenStreetMap |
| **Backend** | Supabase | PostgreSQL + Auth + Realtime + Storage en uno |
| **Tiempo real** | Supabase Realtime | WebSockets — markers aparecen sin refresh |
| **Geolocalización** | Browser Geolocation API | Nativa del navegador, costo $0 |
| **Deploy** | Vercel | Deploy automático desde GitHub, HTTPS gratis |

---

## ⚙️ Configuración de Supabase (paso a paso)

### 1. Crear proyecto
1. Ve a [supabase.com](https://supabase.com) → crear cuenta → **New Project**
2. Nombre: `aliral` | Región: `South America (São Paulo)`
3. Guarda la contraseña de la base de datos

### 2. Crear las tablas (ejecutar en el SQL Editor de Supabase)

```sql
-- Tabla de perfiles públicos (vinculada a auth.users)
CREATE TABLE profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username   TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: crea el perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Tabla principal de reportes
CREATE TABLE reports (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category      TEXT NOT NULL CHECK (category IN (
                  'food','water','shelter','medical','danger','road','rescue','sos'
                )),
  title         TEXT NOT NULL,
  description   TEXT,
  latitude      DOUBLE PRECISION NOT NULL,
  longitude     DOUBLE PRECISION NOT NULL,
  address       TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  confirmations INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Función para incrementar confirmaciones (llamada via RPC)
CREATE OR REPLACE FUNCTION increment_confirmations(report_id UUID)
RETURNS VOID AS $$
  UPDATE reports SET confirmations = confirmations + 1 WHERE id = report_id;
$$ LANGUAGE SQL SECURITY DEFINER;

-- Índice para consultas geoespaciales básicas
CREATE INDEX reports_location_idx ON reports(latitude, longitude);
CREATE INDEX reports_category_idx ON reports(category);
CREATE INDEX reports_active_idx   ON reports(is_active);
```

### 3. Habilitar Row Level Security (RLS)

```sql
-- Activar RLS en ambas tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports  ENABLE ROW LEVEL SECURITY;

-- Profiles: cualquiera puede leer, solo el dueño puede editar
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Reports: lectura pública, escritura solo autenticados, borrado solo autor
CREATE POLICY "reports_select" ON reports FOR SELECT USING (true);
CREATE POLICY "reports_insert" ON reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reports_update" ON reports FOR UPDATE USING (auth.uid() = user_id);
```

### 4. Activar Realtime

En el dashboard de Supabase:  
**Database → Replication → Tables** → activar `reports` ✅

---

## 🚀 Despliegue local (desarrollo)

### Requisitos
- Node.js 18+ 
- npm 9+
- Cuenta en [Supabase](https://supabase.com) (gratuita)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/aliral.git
cd aliral

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores reales de Supabase:
# VITE_SUPABASE_URL=https://xxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJhbGci...

# 4. Levantar servidor de desarrollo
npm run dev
# → http://localhost:5173
```

---

## 🌐 Despliegue en producción (Vercel)

### Opción A — Deploy desde GitHub (recomendado)

1. Push del repo a GitHub
2. Ir a [vercel.com](https://vercel.com) → **New Project** → importar repo
3. En **Environment Variables** agregar:
   - `VITE_SUPABASE_URL` → URL de tu proyecto Supabase
   - `VITE_SUPABASE_ANON_KEY` → Anon key de Supabase
4. Click **Deploy** → Vercel detecta Vite automáticamente ✅

### Opción B — CLI de Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
# Seguir las instrucciones interactivas
# Agregar env vars cuando las pida
```

### Variables de entorno necesarias en Vercel

| Variable | Dónde obtenerla |
|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → anon / public |

> ⚠️ **NUNCA** subas el archivo `.env` real al repositorio. El `.gitignore` ya lo excluye.

---

## 📱 Funcionalidades del MVP

| Feature | Estado |
|---|---|
| Registro de usuario | ✅ |
| Inicio de sesión | ✅ |
| Mapa interactivo (OpenStreetMap) | ✅ |
| Ver reportes activos en mapa | ✅ |
| Filtrar por categoría | ✅ |
| Crear reporte con geolocalización | ✅ |
| Actualización en tiempo real (Realtime) | ✅ |
| Confirmaciones de reporte | ✅ (backend listo) |
| Diseño Mobile-first | ✅ |

---

## 🗺️ Flujo de la aplicación

```
Usuario entra → Ve el mapa con reportes activos
                         │
              ┌──────────┴──────────┐
              │                     │
         Sin sesión              Con sesión
              │                     │
    [Botón +] → Modal Auth    [Botón +] → ReportForm
              │                     │
         Login/Registro        Captura GPS
              │                     │
         Sesión activa         Publica reporte
                                     │
                           Aparece en el mapa
                           de TODOS en tiempo real
```

---

## 👥 Contribución (equipo)

### Ramas sugeridas
```
main          ← producción (solo merge via PR)
develop       ← integración
feat/mapa     ← features del mapa
feat/auth     ← features de autenticación
feat/reportes ← features de reportes
```

### Commits (convención)
```
feat: agrega confirmación de reportes
fix: corrige icono de categoría 'rescue'
style: ajusta padding del navbar en mobile
chore: actualiza dependencias
```

---

## 📞 Soporte

Ante dudas de configuración de Supabase: [docs.supabase.com](https://docs.supabase.com)  
Ante dudas de Leaflet: [leafletjs.com](https://leafletjs.com)  
Ante dudas de Vercel: [vercel.com/docs](https://vercel.com/docs)
