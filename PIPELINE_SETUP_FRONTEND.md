# 🚀 Pipeline CI/CD - Frontend React + Vite

## 📋 Descripción
Pipeline automatizado con **GitHub Actions + Render** para el frontend React que se conecta a las APIs de Render.

## 🔧 URLs de APIs Configuradas

### Producción (Render):
- **Article Extractor API**: `https://article-extractor-api-38.onrender.com`
- **Cartoon Generator API**: `https://cartoon-generator-api-38.onrender.com`

### Desarrollo (Local):
- **Article Extractor API**: `http://localhost:8081`
- **Cartoon Generator API**: `http://localhost:8085`

## 🛠️ Configuración del Pipeline

### 1️⃣ Crear Servicio en Render para Frontend

```
1. Ve a: https://dashboard.render.com/
2. Click "New +" > "Static Site"
3. Conectar repositorio de GitHub
4. Seleccionar: AS241S5_AEJ_38-fe
5. Configurar:
   - Name: unified-ai-platform-fe-38
   - Branch: develop-unificado
   - Build Command: npm run build
   - Publish Directory: dist
6. Click "Create Static Site"
7. COPIAR el Service ID de la URL (srv-XXXXX)
```

### 2️⃣ Configurar Secrets en GitHub

```
Ve a: Settings > Secrets and variables > Actions

Agregar estos 2 secrets:
- RENDER_API_KEY = tu_api_key_render
- RENDER_SERVICE_ID = srv-XXXXX (del frontend)
```

### 3️⃣ Hacer Push para Activar Pipeline

```bash
cd c:\Users\USER\Documents\Api\frontend\AS241S5_AEJ_38-fe

# Agregar archivos
git add .

# Commit
git commit -m "feat: add frontend CI/CD pipeline with Render integration"

# Push
git push origin develop-unificado
```

## 🎯 Flujo del Pipeline

### 1️⃣ Build and Deploy
- ✅ Checkout del código
- ✅ Setup Node.js 20
- ✅ Instalación de dependencias (`npm ci`)
- ✅ Build del proyecto (`npm run build`)
- ✅ Upload de artefactos
- ✅ Trigger deployment en Render

### 2️⃣ Code Quality
- ✅ Linting (`npm run lint`)
- ✅ Type checking (`npx tsc --noEmit`)

## 🌐 URLs Después del Deploy

### Frontend:
```
https://unified-ai-platform-fe-38.onrender.com
```

### APIs Backend:
```
https://article-extractor-api-38.onrender.com/swagger-ui.html
https://cartoon-generator-api-38.onrender.com/swagger-ui.html
```

¡Pipeline listo para funcionar! 🚀