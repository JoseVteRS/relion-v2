FROM node:20-alpine

WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat

# Copiar solo los archivos necesarios para las migraciones
COPY package.json ./
COPY prisma ./prisma/

# Instalar solo las dependencias de Prisma
RUN npm install --no-save @prisma/client prisma --legacy-peer-deps

# Comando para ejecutar las migraciones
CMD ["npx", "prisma", "migrate", "deploy"] 