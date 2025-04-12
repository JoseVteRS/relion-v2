#!/bin/bash
set -e

echo "🔨 Construyendo la aplicación..."
docker-compose build

echo "🚀 Iniciando la aplicación..."
docker-compose up -d app

echo "⏳ Esperando 10 segundos para que la aplicación se inicie..."
sleep 10

echo "🗄️ Ejecutando migraciones de Prisma..."
docker-compose up prisma-migrate

echo "✅ Aplicación desplegada exitosamente!"
echo "📊 La aplicación está disponible en: http://localhost:3000" 