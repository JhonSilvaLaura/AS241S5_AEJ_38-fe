# AI Multi-Tool Platform - Frontend Unificado

<div align="center">

![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Plataforma unificada con diseño oscuro moderno para Article Extractor y Cartoon Generator**

</div>

---

## ✨ Características

### 🎨 Diseño Oscuro Moderno
- ✅ Tema oscuro elegante (negro/gris)
- ✅ Sin colores fosforescentes
- ✅ Interfaz minimalista y profesional
- ✅ Animaciones suaves
- ✅ Responsive design

### 🛠️ Funcionalidades

#### Article Extractor & Summarizer
- **CREATE**: Generar resúmenes de artículos con IA
- **READ**: Listar y filtrar artículos
- **UPDATE**: Actualizar y regenerar resúmenes
- **DELETE**: Eliminar artículos

#### Cartoon Generator
- **CREATE**: Generar cartoons desde imágenes
- **READ**: Listar y filtrar cartoons
- **UPDATE**: Actualizar cartoons existentes
- **DELETE**: Eliminar cartoons
- **CHECK**: Consultar estado de procesamiento

---

##  Instalación

### 1. Instalar dependencias
```bash
cd unified-ai-platform
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 🔌 Backends Requeridos

### Backend 1: Article Extractor (Puerto 8081)
```bash
cd AS241S5_AEJ_38-be
mvn spring-boot:run
```

### Backend 2: Cartoon Generator (Puerto 8085)
```bash
cd AS241S5_AEJ_38-be-develop-be-nosql
mvn spring-boot:run
```

---

## Arquitectura

```
┌─────────────────────────────────────┐
│   Unified AI Platform (React)       │
│   Puerto: 5173                      │
└──────────┬──────────────┬───────────┘
           │              │
           ▼              ▼
┌──────────────────┐  ┌──────────────────┐
│ Article Backend  │  │ Cartoon Backend  │
│ Puerto: 8081     │  │ Puerto: 8085     │
│ PostgreSQL       │  │ MongoDB          │
└──────────────────┘  └──────────────────┘
```

---

##  Paleta de Colores

### Fondo
- **Principal**: `#0a0a0a` (Negro profundo)
- **Secundario**: `#1a1a1a` (Gris oscuro)
- **Bordes**: `#2a2a2a` (Gris medio)

### Texto
- **Principal**: `#ffffff` (Blanco)
- **Secundario**: `#e0e0e0` (Gris claro)
- **Terciario**: `#a0a0a0` (Gris)

### Acentos
- **Primario**: `#ffffff` (Blanco para botones)
- **Success**: `#065f46` (Verde oscuro)
- **Error**: `#991b1b` (Rojo oscuro)
- **Warning**: `#f59e0b` (Naranja)
- **Info**: `#3b82f6` (Azul)

---

##  Estructura del Proyecto

```
unified-ai-platform/
├── src/
│   ├── types/
│   │   ├── article.ts          # Tipos para artículos
│   │   └── cartoon.ts          # Tipos para cartoons
│   ├── services/
│   │   ├── articleService.ts   # API de artículos
│   │   └── cartoonService.ts   # API de cartoons
│   ├── App.tsx                 # Componente principal
│   ├── App.css                 # Estilos oscuros
│   ├── main.tsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

##  Funcionalidades por Tab

### Tab 1: Article Extractor
- Formulario para ingresar URL
- Selección de idioma (ES/EN)
- Configuración de longitud
- Filtros por estado e idioma
- Grid de tarjetas con resúmenes
- Botones de editar y eliminar

### Tab 2: Cartoon Generator
- Formulario para subir imagen
- Selección de estilo (1-6)
- Filtros por estado
- Grid de tarjetas con cartoons
- Botón para consultar estado
- Botones de actualizar y eliminar

---

## Scripts Disponibles

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

##  Endpoints Consumidos

### Article Extractor (http://localhost:8081)
- `POST /api/articles` - Crear resumen
- `GET /api/articles` - Listar todos
- `GET /api/articles/{id}` - Obtener por ID
- `GET /api/articles/status/{status}` - Filtrar por estado
- `GET /api/articles/lang/{lang}` - Filtrar por idioma
- `PUT /api/articles/{id}` - Actualizar
- `DELETE /api/articles/{id}` - Eliminar

### Cartoon Generator (http://localhost:8085)
- `POST /api/cartoon/generate` - Generar cartoon
- `GET /api/cartoon/all` - Listar todos
- `GET /api/cartoon/{id}` - Obtener por ID
- `GET /api/cartoon/task/{taskId}` - Consultar estado
- `GET /api/cartoon/status/{status}` - Filtrar por estado
- `PUT /api/cartoon/{id}` - Actualizar
- `DELETE /api/cartoon/{id}` - Eliminar

---

##  Características de UI/UX

### Diseño
- ✅ Tema oscuro profesional
- ✅ Sin colores brillantes o fosforescentes
- ✅ Contraste óptimo para lectura
- ✅ Espaciado generoso
- ✅ Tipografía Inter

### Interactividad
- ✅ Tabs para cambiar entre herramientas
- ✅ Filtros dinámicos con contadores
- ✅ Modales para edición
- ✅ Notificaciones toast
- ✅ Estados de carga
- ✅ Confirmaciones antes de eliminar

### Responsive
- ✅ Adaptable a móviles
- ✅ Grid responsive
- ✅ Tabs verticales en móvil
- ✅ Filtros apilados en móvil

---

##  Requisitos

- Node.js 18+
- Backend Article Extractor corriendo en puerto 8081
- Backend Cartoon Generator corriendo en puerto 8085

---

##  Notas

1. **Backends independientes**: Cada backend corre en su propio puerto
2. **CORS**: Los backends deben tener CORS habilitado
3. **Procesamiento asíncrono**: Los cartoons se procesan de forma asíncrona
4. **Diseño oscuro**: Sin colores fosforescentes, solo negro/gris/blanco

---

##  Para el Video

### Demostración Article Extractor
1. Crear 2-3 artículos
2. Mostrar filtros
3. Editar un artículo
4. Eliminar un artículo

### Demostración Cartoon Generator
1. Generar 2-3 cartoons
2. Consultar estado
3. Mostrar filtros
4. Actualizar un cartoon
5. Eliminar un cartoon

---

##  Desarrollo

Desarrollado con:
- React 19 + TypeScript
- Vite para desarrollo rápido
- Axios para Article API
- Fetch API para Cartoon API
- Lucide React para iconos
- CSS moderno con variables

---

##  Licencia

Proyecto académico - AS241S5 Arquitectura Empresarial Java

---

<div align="center">

**¡Frontend unificado con diseño oscuro moderno!** 

</div>
