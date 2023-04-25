#FROM node:18.15.0-bullseye-slim
FROM node:18.16-alpine
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_es1a
#Copiar codigo de la aplicación en el contenedor
COPY . /app
WORKDIR /app
#Instalar las dependencias
RUN npm install 
#Compilar desde typescript a javascript (Se genera la salida en el directorio build)
RUN npm run build
# La siguiente línea optimiza node.js para entornos de producción
ENV NODE_ENV production 
#Ejecutar en producción
CMD ["node", "build/server.js"]cd 