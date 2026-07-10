# 🚀 Article Extractor - Guía de Inicio Rápido

Guía completa para levantar el proyecto completo (Backend + Frontend) con comandos simples.

---

## 📋 Requisitos Previos

### Para Desarrollo Local:
- **Java 21** (para el backend)
- **Maven 3.8+** (o usa el wrapper incluido `mvnw`)
- **Node.js 18+** (para el frontend)
- **PostgreSQL** (o acceso a la base de datos configurada)

### Para Kubernetes:
- **Docker Desktop** (con Kubernetes habilitado)
- **kubectl** instalado
- **Git** para clonar repos

---

## 🎯 Inicio Rápido - Desarrollo Local

### 1️⃣ **Levantar el Backend**

```bash
cd AS241S5_AEJ_38-be
./mvnw spring-boot:run
```

**Windows (CMD):**
```cmd
cd AS241S5_AEJ_38-be
mvnw.cmd spring-boot:run
```

**¿Qué hace este comando?**
- Descarga las dependencias de Maven (si es necesario)
- Compila el proyecto
- Levanta el servidor Spring Boot en el puerto **8081**

✅ **Backend listo cuando veas:** `Started ArticleExtractorApplication in X seconds`

---

### 2️⃣ **Levantar el Frontend**

En otra terminal (mientras el backend sigue corriendo):

```bash
cd AS241S5_AEJ_38-fe
npm install && npm run dev
```

**¿Qué hace este comando?**
- Instala las dependencias de Node.js
- Levanta el servidor de desarrollo Vite

✅ **Frontend listo cuando veas:** `Local: http://localhost:5173/`

---

## 🔍 Comandos de Verificación

### ✅ **Verificar que el Backend está corriendo**

```bash
curl http://localhost:8081/actuator/health
```

**Respuesta esperada:**
```json
{"status":"UP"}
```

**Alternativa en navegador:**
- Health check: http://localhost:8081/actuator/health
- Swagger UI: http://localhost:8081/swagger-ui.html
- API Docs: http://localhost:8081/api-docs

---

### ✅ **Verificar que el Frontend está corriendo**

```bash
curl http://localhost:5173
```

**Alternativa en navegador:**
- Aplicación: http://localhost:5173

---

### ✅ **Verificar conexión Frontend → Backend**

Desde el frontend, intenta hacer una petición a:
```
http://localhost:8081/api/articles
```

O prueba directamente en el navegador la documentación Swagger:
```
http://localhost:8081/swagger-ui.html
```

---

## 🛠️ Comandos Útiles Adicionales

### Backend (Spring Boot)

```bash
# Compilar sin ejecutar
./mvnw clean compile

# Ejecutar tests
./mvnw test

# Generar JAR
./mvnw clean package

# Ejecutar el JAR generado
java -jar target/articleExtractor-0.0.1-SNAPSHOT.jar
```

### Frontend (React + Vite)

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

---

## 🌐 Puertos y URLs

| Servicio | Puerto | URL |
|----------|--------|-----|
| Backend API | 8081 | http://localhost:8081 |
| Frontend | 5173 | http://localhost:5173 |
| Swagger UI | 8081 | http://localhost:8081/swagger-ui.html |
| Health Check | 8081 | http://localhost:8081/actuator/health |

---

## 🐛 Troubleshooting

### El backend no arranca

1. **Verifica Java:**
   ```bash
   java -version
   ```
   Debe ser Java 21 o superior.

2. **Verifica el puerto 8081:**
   ```bash
   netstat -ano | findstr :8081
   ```
   Si está ocupado, mata el proceso o cambia el puerto en `application.yaml`.

3. **Revisa la conexión a la base de datos:**
   Verifica que las variables de entorno estén configuradas o que los valores por defecto en `application.yaml` sean correctos.

### El frontend no arranca

1. **Verifica Node.js:**
   ```bash
   node -v
   npm -v
   ```

2. **Limpia node_modules:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Verifica el puerto 5173:**
   ```bash
   netstat -ano | findstr :5173
   ```

---

## 📝 Variables de Entorno

### Backend

El backend usa las siguientes variables (definidas en `application.yaml` con valores por defecto):

- `DATABASE_URL` - URL de conexión a PostgreSQL
- `DATABASE_USERNAME` - Usuario de la base de datos
- `DATABASE_PASSWORD` - Contraseña de la base de datos
- `RAPIDAPI_KEY` - API Key de RapidAPI
- `RAPIDAPI_HOST` - Host de RapidAPI
- `RAPIDAPI_BASE_URL` - URL base de RapidAPI

### Frontend

El frontend usa archivos `.env`:
- `.env.development` - Para desarrollo
- `.env.production` - Para producción

---

## 🎉 ¡Listo!

Ahora tienes todo el stack corriendo:

1. ✅ Backend en http://localhost:8081
2. ✅ Frontend en http://localhost:5173
3. ✅ Swagger UI en http://localhost:8081/swagger-ui.html

**¡A desarrollar! 🚀**

---

## ☸️ Despliegue en Kubernetes - UN SOLO COMANDO

### 🚀 **Desplegar TODO en Kubernetes de una vez**

Desde la raíz del proyecto `APIsAI/`:

**Windows (PowerShell):**
```powershell
# Desplegar Article Extractor (Backend 1)
kubectl apply -f AS241S5_AEJ_38-be\manifest-jhon-silva\

# Desplegar Cartoon Generator (Backend 2)
kubectl apply -f otroBackAI\AS241S5_AEJ_38-be\manifest-cartoon-generator\

# Desplegar Frontend
kubectl apply -f AS241S5_AEJ_38-fe\manifest-frontend\
```

**Linux/Mac:**
```bash
# Desplegar Article Extractor (Backend 1)
kubectl apply -f AS241S5_AEJ_38-be/manifest-jhon-silva/

# Desplegar Cartoon Generator (Backend 2)
kubectl apply -f otroBackAI/AS241S5_AEJ_38-be/manifest-cartoon-generator/

# Desplegar Frontend
kubectl apply -f AS241S5_AEJ_38-fe/manifest-frontend/
```

**¿Qué hace cada comando?**
- Crea el namespace `jhon-silva-38`
- Aplica todos los ConfigMaps
- Aplica todos los Secrets
- Crea todos los Deployments (Article Extractor, Cartoon Generator, Frontend)
- Crea todos los Services con LoadBalancer

**⏱️ Esperar 2-3 minutos** para que las imágenes se descarguen y los pods inicien.

---

## ✅ Verificar Despliegue en Kubernetes

### **Ver todo el estado del cluster:**
```bash
kubectl get all -n jhon-silva-38
```

### **Ver solo los pods (deben estar Running):**
```bash
kubectl get pods -n jhon-silva-38
```

**Salida esperada:**
```
NAME                                            READY   STATUS    RESTARTS   AGE
cartoon-generator-deployment-xxxxxxxxxx-xxxxx   1/1     Running   0          2m
cartoon-generator-deployment-xxxxxxxxxx-xxxxx   1/1     Running   0          2m
frontend-deployment-xxxxxxxxxx-xxxxx            1/1     Running   0          2m
frontend-deployment-xxxxxxxxxx-xxxxx            1/1     Running   0          2m
jhon-silva-38-deployment-xxxxxxxxxx-xxxxx       1/1     Running   0          2m
jhon-silva-38-deployment-xxxxxxxxxx-xxxxx       1/1     Running   0          2m
```

✅ **TODOS deben estar "1/1 Running"**

---

### **Ver los servicios y obtener las URLs:**
```bash
kubectl get svc -n jhon-silva-38
```

**Salida esperada:**
```
NAME                        TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
jhon-silva-38-service       LoadBalancer   10.96.x.x       localhost     8081:xxxxx/TCP   2m
cartoon-generator-service   LoadBalancer   10.96.x.x       localhost     8085:xxxxx/TCP   2m
frontend-service            LoadBalancer   10.96.x.x       localhost     80:xxxxx/TCP     2m
```

---

### **Acceder a los servicios:**

**Frontend:**
```
http://localhost
```

**Article Extractor (Swagger):**
```
http://localhost:8081/swagger-ui.html
```

**Cartoon Generator (Swagger):**
```
http://localhost:8085/swagger-ui.html
```

---

### **Probar conectividad:**

```bash
# Health check - Article Extractor
curl http://localhost:8081/actuator/health

# Health check - Cartoon Generator
curl http://localhost:8085/actuator/health

# Frontend
curl http://localhost
```

**Respuesta esperada de health checks:**
```json
{"status":"UP"}
```

---

## 🔍 Comandos Útiles de Kubernetes

### **Ver logs de un pod:**
```bash
# Listar pods
kubectl get pods -n jhon-silva-38

# Ver logs de un pod específico
kubectl logs <nombre-del-pod> -n jhon-silva-38

# Seguir logs en tiempo real
kubectl logs -f <nombre-del-pod> -n jhon-silva-38
```

### **Ver eventos del cluster:**
```bash
kubectl get events -n jhon-silva-38 --sort-by='.lastTimestamp'
```

### **Escalar réplicas:**
```bash
# Aumentar a 3 réplicas
kubectl scale deployment/jhon-silva-38-deployment --replicas=3 -n jhon-silva-38

# Reducir a 1 réplica
kubectl scale deployment/frontend-deployment --replicas=1 -n jhon-silva-38
```

### **Reiniciar un deployment:**
```bash
kubectl rollout restart deployment/frontend-deployment -n jhon-silva-38
```

### **Port-forward (si LoadBalancer no funciona):**
```bash
# Frontend
kubectl port-forward svc/frontend-service 8080:80 -n jhon-silva-38

# Article Extractor
kubectl port-forward svc/jhon-silva-38-service 8081:8081 -n jhon-silva-38

# Cartoon Generator
kubectl port-forward svc/cartoon-generator-service 8085:8085 -n jhon-silva-38
```

---

## 🧹 Limpiar Kubernetes (eliminar todo)

### **Opción 1: Eliminar el namespace completo (RECOMENDADO)**
```bash
kubectl delete namespace jhon-silva-38
```
**Esto elimina TODO: pods, services, deployments, configmaps, secrets.**

---

### **Opción 2: Eliminar recursos por carpeta**

**Windows:**
```powershell
kubectl delete -f AS241S5_AEJ_38-be\manifest-jhon-silva\
kubectl delete -f otroBackAI\AS241S5_AEJ_38-be\manifest-cartoon-generator\
kubectl delete -f AS241S5_AEJ_38-fe\manifest-frontend\
```

**Linux/Mac:**
```bash
kubectl delete -f AS241S5_AEJ_38-be/manifest-jhon-silva/
kubectl delete -f otroBackAI/AS241S5_AEJ_38-be/manifest-cartoon-generator/
kubectl delete -f AS241S5_AEJ_38-fe/manifest-frontend/
```

---

## 📞 Soporte

Si tienes problemas, verifica:
1. Los logs del backend en la terminal
2. Los logs del frontend en la terminal
3. La consola del navegador (F12)
4. Los logs de los pods en Kubernetes: `kubectl logs <pod-name> -n jhon-silva-38`
