FROM node:20-alpine3.19
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instalar PM2 globalmente
RUN npm install pm2 -g

# Copiar el código fuente
COPY . .

# Exponer el puerto
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["pm2-runtime", "index.js"]





