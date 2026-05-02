#!/bin/bash

echo "🔧 Arreglando Tailwind CSS..."

# Desinstalar Tailwind v4
echo "📦 Desinstalando Tailwind v4..."
npm uninstall @tailwindcss/vite tailwindcss

# Instalar Tailwind v3 y dependencias
echo "📦 Instalando Tailwind v3..."
npm install -D tailwindcss@^3.4.0 postcss autoprefixer

# Limpiar caché
echo "🧹 Limpiando caché..."
rm -rf node_modules/.vite

echo "✅ ¡Listo! Ahora ejecuta: npm run dev"
