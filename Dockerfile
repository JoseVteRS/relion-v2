# Dockerfile para la aplicación Vinxi con Bun

FROM oven/bun:1.1-slim

WORKDIR /app

# Copiar package.json y los archivos de bloqueo primero para aprovechar la caché
COPY package.json bun.lockb ./
COPY tsconfig.json ./
COPY prisma ./prisma/

# Instalar dependencias y generar cliente Prisma
RUN bun install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN bun run build

# Configurar variables de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["bun", "start"] 