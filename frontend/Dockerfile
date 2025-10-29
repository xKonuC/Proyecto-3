FROM node:20-alpine3.19 AS builder
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Imagen de producción con nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar archivos construidos
COPY --from=builder /app/build .

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto
EXPOSE 5173

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]





