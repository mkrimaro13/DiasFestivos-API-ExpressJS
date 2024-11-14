# Usas una imagen de Node.js como base 
FROM node:latest 
# Crear carpeta para la aplicación 
WORKDIR /usr/src/app 
# Instalar dependencias 
# Se usa un comodín para garantizar que ambos package.json Y package-lock.json sean copiados 
COPY package*.json ./ 
RUN npm install
# Si se está construyendo para ambiente de producción 
# RUN npm ci --only=production 
# copiar el código fuente de la aplicación completo 
COPY . .
#Exponer el Puerto donde correrá la aplicación 
EXPOSE 3000
#Comando para ejecutar la aplicación 
CMD [ "node", "app.js" ]