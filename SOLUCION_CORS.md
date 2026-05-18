# ✅ Solución de Error CORS

## 🐛 Error Original
```
Access to XMLHttpRequest at 'http://localhost:8081/api/articles' from origin 'http://localhost:5175' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

---

## ✅ Soluciones Aplicadas

### 1. Backend - CORS Actualizado
Se agregó el puerto **5175** a la configuración de CORS en:
```
AS241S5_AEJ_38-be/src/main/java/jhon/silva/articleExtractor/Config/CorsConfig.java
```

Ahora permite:
- `http://localhost:5173`
- `http://localhost:5175` ✅ NUEVO
- `http://localhost:3000`

### 2. Frontend - Usando Proxy de Vite
Se cambiaron las URLs de los servicios para usar rutas relativas:

**Antes:**
```typescript
const API_BASE_URL = 'http://localhost:8081/api/articles';
```

**Ahora:**
```typescript
const API_BASE_URL = '/api/articles';
```

El proxy de Vite (configurado en `vite.config.ts`) redirige automáticamente:
- `/api/articles` → `http://localhost:8081/api/articles`
- `/api/cartoon` → `http://localhost:8085/api/cartoon`

---

## 🚀 Para Aplicar los Cambios

### 1. Reiniciar Backend
```bash
# Detén el backend (Ctrl + C)
cd AS241S5_AEJ_38-be
mvn spring-boot:run
```

### 2. Reiniciar Frontend
```bash
# Detén el frontend (Ctrl + C)
cd unified-ai-platform
npm run dev
```

---

## ✅ Verificar que Funciona

1. Abre: **http://localhost:5175** (o el puerto que te asigne Vite)
2. Ve al tab "Article Extractor"
3. La lista de artículos debería cargar sin errores
4. Abre DevTools (F12) → Console
5. **NO debería haber errores de CORS**

---

## 🔍 Si Aún Tienes Errores

### Error: "Backend no responde"
```bash
# Verifica que el backend esté corriendo
curl http://localhost:8081/actuator/health

# Debería responder: {"status":"UP"}
```

### Error: "Proxy no funciona"
Verifica que `vite.config.ts` tenga:
```typescript
server: {
  port: 5173,
  proxy: {
    '/api/articles': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    },
    '/api/cartoon': {
      target: 'http://localhost:8085',
      changeOrigin: true,
    }
  }
}
```

### Error: "Puerto diferente"
Si Vite inicia en otro puerto (ej: 5174, 5175), es normal.
El proxy funcionará igual.

---

## 💡 Ventajas del Proxy

1. ✅ **No más errores de CORS** en desarrollo
2. ✅ **URLs relativas** más limpias
3. ✅ **Fácil cambiar** backend en producción
4. ✅ **Funciona** en cualquier puerto que use Vite

---

## 📝 Resumen

| Problema | Solución |
|----------|----------|
| CORS bloqueado | Backend permite puerto 5175 |
| URLs absolutas | Cambiadas a rutas relativas |
| Proxy no configurado | Ya está en vite.config.ts |

---

¡Ahora debería funcionar sin errores de CORS mano! 🎉
