FROM node:16
LABEL org.opencontainers.image.source https://github.com/arquisoft/lomap_es1a
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG API_URI="http://localhost:5000/"
ENV REACT_APP_API_URI=$API_URI

#Create an optimized version of the webapp
RUN npm run build 
#--> PTE Resolver problema transpilar mapa

#Execute npm run prod to run the server
#CMD ["npm", "start"]
CMD [ "npm", "run", "prod" ]
