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
   - Name: unified-ai-platform-fe
   - Branch: develop
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

# Crear rama develop
git checkout -b develop

# Agregar archivos
git add .

# Commit
git commit -m "feat: add frontend CI/CD pipeline with Render URLs"

# Push
git push -u origin develop
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
https://unified-ai-platform-fe.onrender.com
```

### APIs Backend:
```
https://article-extractor-api-38.onrender.com
https://cartoon-generator-api-38.onrender.com
```

## 🔄 Desarrollo Local

### Instalar dependencias:
```bash
npm install
```

### Ejecutar en desarrollo:
```bash
npm run dev
```

### Build para producción:
```bash
npm run build
```

### Preview build:
```bash
npm run preview
```

## 📊 Configuración de APIs

### Desarrollo:
- Usa proxy de Vite (`/api/articles` -> `http://localhost:8081`)
- Usa proxy de Vite (`/api/cartoon` -> `http://localhost:8085`)

### Producción:
- Conecta directamente a Render APIs
- `import.meta.env.PROD` detecta el entorno

## 🎥 Para el Video

### Demostrar:

1. **Configuración de URLs** (2-3 min)
   - Mostrar archivos de configuración
   - Explicar diferencia desarrollo vs producción
   - Mostrar variables de entorno

2. **Pipeline del Frontend** (3-4 min)
   - Mostrar archivo `pipeline.yml`
   - Explicar jobs del pipeline
   - Mostrar configuración de secrets

3. **Deploy del Frontend** (3-4 min)
   - Hacer commit y push
   - Mostrar pipeline ejecutándose
   - Ver deployment en Render
   - Probar la aplicación web

4. **Integración Completa** (2-3 min)
   - Mostrar frontend conectado a APIs
   - Probar funcionalidades
   - Mostrar Swagger de las APIs

## 🔗 Enlaces Importantes

### GitHub:
```
Repository: https://github.com/TU_USUARIO/AS241S5_AEJ_38-fe
Actions: https://github.com/TU_USUARIO/AS241S5_AEJ_38-fe/actions
Settings: https://github.com/TU_USUARIO/AS241S5_AEJ_38-fe/settings/secrets/actions
```

### Render:
```
Dashboard: https://dashboard.render.com/
Static Site: https://dashboard.render.com/static/srv-XXXXX
```

### APIs de Backend:
```
Article API: https://article-extractor-api-38.onrender.com/swagger-ui.html
Cartoon API: https://cartoon-generator-api-38.onrender.com/swagger-ui.html
```

## ⚠️ Troubleshooting

### Error: "API calls failing"
- Verifica que las URLs de Render estén correctas
- Asegúrate de que los backends estén desplegados
- Revisa CORS en los backends

### Error: "Build failed"
- Verifica que `npm ci` funcione localmente
- Asegúrate de que `npm run build` funcione
- Revisa las dependencias en `package.json`

### Error: "Render deployment failed"
- Verifica RENDER_API_KEY y RENDER_SERVICE_ID
- Revisa los logs en Render Dashboard
- Asegúrate de que el build command sea correcto

## 🎨 Arquitectura Completa

```
┌─────────────────────────────────────────┐
│            FRONTEND (React)             │
│        unified-ai-platform-fe          │
│    https://....onrender.com             │
└─────────────────┬───────────────────────┘
                  │
    ┌─────────────┴──────────────┐
    │                            │
    ▼                            ▼
┌───────────────────┐    ┌─────────────────────┐
│  Article Extractor│    │  Cartoon Generator  │
│   (PostgreSQL)    │    │    (MongoDB)        │
│   Port: 8081      │    │    Port: 8085       │
└───────────────────┘    └─────────────────────┘
```

¡Todo listo para el pipeline completo! 🚀