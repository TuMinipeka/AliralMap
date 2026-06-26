# Aliral — Cómo ejecutar el proyecto

---

## Requisitos previos

| Herramienta | Versión mínima | Descarga |
|---|---|---|
| Node.js | 20+ | https://nodejs.org |
| npm | 9+ | incluido con Node |
| Docker | cualquiera | https://www.docker.com (solo si usas Docker) |

También necesitas una cuenta en [Supabase](https://supabase.com) (gratuita) para obtener las variables de entorno.

---

## 1. Clonar el repositorio

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

## 2. Configurar las variables de entorno

**Linux / macOS**
```bash
cp .env.example .env
```

**PowerShell**
```powershell
Copy-Item .env.example .env
```

Luego abre `.env` y rellena los valores:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

> Encuéntralos en: Supabase → tu proyecto → **Project Settings → API**

---

## Opción A — Ejecutar con Node (sin Docker)

### 3A. Instalar dependencias

**Linux / macOS**
```bash
npm install
```

**PowerShell**
```powershell
npm install
```

### 4A. Levantar el servidor de desarrollo

**Linux / macOS**
```bash
npm run dev
```

**PowerShell**
```powershell
npm run dev
```

Abre el navegador en: **http://localhost:5173**

---

## Opción B — Ejecutar con Docker

No necesitas tener Node instalado en tu máquina.

### 3B. Levantar el contenedor

**Linux / macOS**
```bash
docker compose up
```

**PowerShell**
```powershell
docker compose up
```

Abre el navegador en: **http://localhost:5173**

> La primera vez tarda más porque descarga la imagen y ejecuta `npm install` dentro del contenedor.

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

## Build de producción (opcional)

### Con Node

**Linux / macOS**
```bash
npm run build
```

**PowerShell**
```powershell
npm run build
```

El resultado queda en la carpeta `dist/`.

### Con Docker (imagen nginx lista para deploy)

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

> Las variables `VITE_*` se incluyen en el bundle durante el build.
> Reemplaza los valores por tus keys reales de Supabase antes de ejecutar.
