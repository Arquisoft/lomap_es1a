FROM node:18.15.0-bullseye-slim
# La siguiente línea optimiza node.js para entornos de producción
#ENV NODE_ENV production 
LABEL org.opencontainers.image.source https://github.com/Arquisoft/lomap_es1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install
CMD [ "npm", "start" ]