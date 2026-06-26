# Aliral — Cómo ejecutar el proyecto

---

## Requisitos previos

| Herramienta | Descarga |
|---|---|
| Docker Desktop | https://www.docker.com/products/docker-desktop |
| Git | https://git-scm.com |

> No se necesita Node ni npm instalados en el host.

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

Abre `.env` y rellena los valores:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

> Encuéntralos en: Supabase → tu proyecto → **Project Settings → API**

---

## 3. Levantar el proyecto

**Linux / macOS**
```bash
docker compose up
```

**PowerShell**
```powershell
docker compose up
```

Abre el navegador en: **http://localhost:5173**

> La primera vez tarda más porque descarga la imagen base y ejecuta `npm install` dentro del contenedor.

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

## Build de producción

Genera una imagen nginx lista para deploy. Las variables `VITE_*` se incluyen en el bundle durante el build — reemplaza los valores por tus keys reales de Supabase.

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
