# Dockerfile para la aplicación Node.js con Vinxi y Prisma

# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat

# Copiar archivos de configuración
COPY package.json bun.lockb ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Instalar dependencias con --legacy-peer-deps para resolver conflictos
RUN npm install --legacy-peer-deps

# Generar cliente Prisma
RUN npx prisma generate

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine AS runner

WORKDIR /app

# Instalar dependencias necesarias
RUN apk add --no-cache libc6-compat

# Configurar variables de entorno para producción
ENV NODE_ENV=production

# Copiar archivos de la etapa de construcción
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env.production ./.env

# Exponer el puerto necesario (ajústate según tu aplicación)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"] 