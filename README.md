# 🎨 AI Cartoon Generator - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)

Frontend moderno y responsive para consumir la API de AI Cartoon Generator

</div>

---

## 📋 Descripción

Aplicación web desarrollada en React + TypeScript que permite a los usuarios:

- ✅ **Generar** cartoons a partir de imágenes usando IA
- ✅ **Listar** todos los cartoons generados
- ✅ **Actualizar** cartoons existentes con nuevas imágenes
- ✅ **Eliminar** cartoons (borrado lógico)
- ✅ **Consultar** el estado de procesamiento de las tareas
- ✅ **Filtrar** por estado (pending, completed, failed)
- ✅ **Visualizar** las imágenes cartoon generadas

---

## 🚀 Tecnologías

| Tecnología   | Versión | Uso                                    |
|--------------|---------|----------------------------------------|
| React        | 19.2.5  | Librería UI                            |
| TypeScript   | 6.0.2   | Tipado estático                        |
| Vite         | 8.0.10  | Build tool y dev server                |
| CSS3         | -       | Estilos modernos con variables CSS     |

---

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar la URL del backend

El frontend está configurado para conectarse a:
```
http://localhost:8085/api/cartoon
```

Si tu backend corre en otro puerto, edita el archivo:
```typescript
// src/services/cartoonService.ts
const API_BASE_URL = 'http://localhost:TU_PUERTO/api/cartoon';
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 🎯 Funcionalidades

### 1. **Generar Cartoon (CREATE)**
- Sube una imagen (JPEG, PNG, BMP, WEBP)
- Selecciona un estilo de cartoon (1-6)
- La imagen se procesa de forma asíncrona
- Se guarda en la base de datos con estado "pending"

### 2. **Listar Cartoons (READ)**
- Muestra todos los cartoons generados
- Filtra por estado: Todos, Pendientes, Completados, Fallidos
- Visualiza las imágenes generadas
- Muestra detalles técnicos (IDs, fechas, etc.)

### 3. **Actualizar Cartoon (UPDATE)**
- Selecciona un cartoon existente
- Sube una nueva imagen y/o cambia el estilo
- Regenera el cartoon usando la API de IA
- Actualiza el registro en la base de datos

### 4. **Eliminar Cartoon (DELETE)**
- Borrado lógico (no elimina físicamente)
- Marca el registro como eliminado
- No aparece en las consultas posteriores

### 5. **Consultar Estado**
- Para cartoons en estado "pending"
- Consulta el resultado de la tarea asíncrona
- Actualiza automáticamente cuando está completado

---

## 🎨 Estructura del Proyecto

```
src/
├── components/
│   ├── CartoonCard.tsx      # Tarjeta individual de cartoon
│   ├── UploadForm.tsx        # Formulario de subida
│   ├── FilterBar.tsx         # Barra de filtros
│   └── Modal.tsx             # Modal reutilizable
├── services/
│   └── cartoonService.ts     # Servicio API
├── App.tsx                   # Componente principal
├── App.css                   # Estilos principales
├── main.tsx                  # Punto de entrada
└── index.css                 # Estilos globales
```

---

## 🔌 Endpoints Consumidos

| Método   | Endpoint                    | Descripción                    |
|----------|-----------------------------|--------------------------------|
| `POST`   | `/api/cartoon/generate`     | Generar nuevo cartoon          |
| `GET`    | `/api/cartoon/all`          | Listar todos los cartoons      |
| `GET`    | `/api/cartoon/{id}`         | Obtener cartoon por ID         |
| `GET`    | `/api/cartoon/task/{taskId}`| Consultar estado de tarea      |
| `GET`    | `/api/cartoon/status/{status}` | Filtrar por estado          |
| `PUT`    | `/api/cartoon/{id}`         | Actualizar cartoon             |
| `DELETE` | `/api/cartoon/{id}`         | Eliminar cartoon (lógico)      |

---

## 🎨 Características de UI/UX

### Diseño Moderno
- ✅ Gradientes y sombras suaves
- ✅ Animaciones fluidas
- ✅ Iconos emoji para mejor UX
- ✅ Colores semánticos (success, warning, danger)

### Responsive
- ✅ Adaptable a móviles, tablets y desktop
- ✅ Grid responsive para las tarjetas
- ✅ Menú de filtros adaptable

### Interactividad
- ✅ Drag & drop para subir imágenes
- ✅ Preview de imagen antes de subir
- ✅ Notificaciones toast
- ✅ Modal para actualizar
- ✅ Confirmación antes de eliminar

### Estados Visuales
- ✅ Loading states
- ✅ Empty states
- ✅ Error states
- ✅ Success states

---

## 📱 Capturas de Pantalla

### Vista Principal
- Header con título y descripción
- Formulario de subida con drag & drop
- Selector de estilos de cartoon
- Grid de cartoons generados

### Tarjeta de Cartoon
- Nombre de la imagen
- Badge de estado (pending/completed/failed)
- Información del cartoon
- Imagen generada (si está completada)
- Botones de acción (Consultar, Actualizar, Eliminar)
- Detalles expandibles (IDs, fechas)

### Filtros
- Botones para filtrar por estado
- Contador de registros
- Diseño horizontal responsive

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

---

## 🔧 Configuración Adicional

### Cambiar el puerto del dev server

Edita `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000, // Tu puerto deseado
  },
});
```

### Habilitar CORS en el backend

El backend ya tiene CORS habilitado con:
```java
@CrossOrigin(origins = "*")
```

---

## 📝 Notas Importantes

1. **Backend requerido**: El frontend necesita que el backend esté corriendo en `http://localhost:8085`

2. **Procesamiento asíncrono**: Las imágenes se procesan de forma asíncrona. Usa el botón "Consultar Estado" para ver el resultado.

3. **Formatos soportados**: JPEG, PNG, BMP, WEBP

4. **Estilos de cartoon**: Hay 6 estilos diferentes (índices 1-6)

5. **Borrado lógico**: Los cartoons eliminados no se borran físicamente, solo se marcan como eliminados.

---

## 🚀 Despliegue

### Build para producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

### Servir el build

```bash
npm run preview
```

---

## 👨‍💻 Desarrollo

Desarrollado con ❤️ usando:
- React 19 con Hooks
- TypeScript para type safety
- CSS moderno con variables
- Fetch API para peticiones HTTP
- Vite para desarrollo rápido

---

## 📄 Licencia

Este proyecto es parte del curso AS241S5 - Arquitectura Empresarial Java

---

## 🤝 Contribución

Para contribuir:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que el backend esté corriendo
2. Revisa la consola del navegador para errores
3. Verifica la URL del API en `cartoonService.ts`
4. Asegúrate de que CORS esté habilitado en el backend
# AS241S5_AEJ_38-fe
