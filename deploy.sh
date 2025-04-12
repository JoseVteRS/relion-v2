#!/bin/bash
set -e

echo "📋 Verificando requisitos..."
if ! command -v docker >/dev/null 2>&1; then
  echo "❌ Docker no está instalado. Por favor, instálalo primero."
  exit 1
fi

if ! command -v docker-compose >/dev/null 2>&1 && ! docker compose version >/dev/null 2>&1; then
  echo "❌ Docker Compose no está instalado. Por favor, instálalo primero."
  exit 1
fi

# Determinar el comando correcto para docker-compose
if command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker-compose"
else
  DOCKER_COMPOSE="docker compose"
fi

echo "🔄 Deteniendo servicios anteriores si existen..."
$DOCKER_COMPOSE down 2>/dev/null || true

echo "🔨 Construyendo la aplicación con Bun..."
$DOCKER_COMPOSE build --no-cache

echo "🚀 Iniciando la aplicación..."
$DOCKER_COMPOSE up -d app

echo "✅ La aplicación está operativa."

echo "🗄️ Ejecutando migraciones de Prisma con Bun..."
$DOCKER_COMPOSE up prisma-migrate

echo "🎉 Despliegue completado exitosamente!"
echo "📊 La aplicación está disponible en: http://localhost:3000"
echo ""
echo "📝 Para ver los logs: $DOCKER_COMPOSE logs -f app"
echo "🛑 Para detener la aplicación: $DOCKER_COMPOSE down" 