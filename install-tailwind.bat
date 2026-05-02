@echo off
echo Arreglando Tailwind CSS...

echo Desinstalando Tailwind v4...
call npm uninstall @tailwindcss/vite tailwindcss

echo Instalando Tailwind v3...
call npm install -D tailwindcss@^3.4.0 postcss autoprefixer

echo Limpiando cache...
rmdir /s /q node_modules\.vite 2>nul

echo Listo! Ahora ejecuta: npm run dev
pause
