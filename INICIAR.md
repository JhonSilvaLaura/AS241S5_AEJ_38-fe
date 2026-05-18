# 🚀 Iniciar Proyecto Unificado

## ✅ Proyecto Creado

**unified-ai-platform** - Frontend unificado con diseño oscuro moderno

---

## 📦 Instalación (Solo una vez)

```bash
cd unified-ai-platform
npm install
```

---

## 🚀 Iniciar Todo (3 Terminales)

### Terminal 1: Backend Article Extractor
```bash
cd AS241S5_AEJ_38-be
mvn spring-boot:run
```
✅ Debe correr en: **http://localhost:8081**

---

### Terminal 2: Backend Cartoon Generator
```bash
cd AS241S5_AEJ_38-be-develop-be-nosql
mvn spring-boot:run
```
✅ Debe correr en: **http://localhost:8085**

---

### Terminal 3: Frontend Unificado
```bash
cd unified-ai-platform
npm run dev
```
✅ Debe correr en: **http://localhost:5173**

---

## 🌐 URLs Importantes

- **Frontend**: http://localhost:5173
- **Backend Articles**: http://localhost:8081/swagger-ui.html
- **Backend Cartoons**: http://localhost:8085/swagger-ui.html

---

## 🎨 Características del Diseño

### Colores
- ✅ Fondo negro (#0a0a0a)
- ✅ Gris oscuro (#1a1a1a)
- ✅ Texto blanco/gris
- ✅ Sin colores fosforescentes

### Funcionalidades
- ✅ 2 Tabs (Articles / Cartoons)
- ✅ CRUD completo en ambos
- ✅ Filtros dinámicos
- ✅ Modales de edición
- ✅ Notificaciones
- ✅ Responsive

---

## 🎯 Probar Funcionalidades

### Article Extractor
1. Click en tab "Article Extractor"
2. Ingresa URL: `https://elperuano.pe/noticia/...`
3. Selecciona idioma y longitud
4. Click "Generar Resumen"
5. Prueba filtros, editar y eliminar

### Cartoon Generator
1. Click en tab "Cartoon Generator"
2. Selecciona una imagen
3. Elige estilo (1-6)
4. Click "Generar Cartoon"
5. Consulta estado, actualiza o elimina

---

## 🐛 Si Algo Falla

### Frontend no inicia
```bash
cd unified-ai-platform
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend no conecta
1. Verifica que ambos backends estén corriendo
2. Verifica puertos 8081 y 8085
3. Verifica CORS en backends

### Error de módulos
```bash
npm install axios lucide-react --legacy-peer-deps
```

---

## 📊 Estructura

```
unified-ai-platform/
├── src/
│   ├── types/          # Tipos TypeScript
│   ├── services/       # APIs
│   ├── App.tsx         # Componente principal
│   ├── App.css         # Estilos oscuros
│   └── main.tsx        # Entry point
├── package.json
└── vite.config.ts
```

---

## ✅ Checklist

- [ ] Backends corriendo (8081 y 8085)
- [ ] Frontend corriendo (5173)
- [ ] npm install ejecutado
- [ ] Navegador abierto en http://localhost:5173
- [ ] Ambos tabs funcionando
- [ ] CRUD probado en ambos

---

¡Listo mano! 🎉
