FROM node:16.14.2

# Create app directory (create a directory to hold the application code inside the image, this will be the working directory for your application)
WORKDIR /usr/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Aca expongo cual va a ser el puerto donde MI APP va a contestar. 
# Despues con el comando: 'docker run -p XXXX:3002 -d node-course/web-server' 
# le puedo decir que si yo entro por el puerto XXXX, me lo mapee al 3200
EXPOSE 3002

CMD [ "npm", "start" ]

# BUILD (The -t flag lets you tag your image so it's easier to find later using the docker images) 'docker build -t vieux/apache:2.0' ==> Will then tag the resulting image. The repository name will be vieux/apache and the tag will be 2.0
# docker build . -t node-course/web-server

# RUN (Running your image with -d runs the container in detached mode, leaving the container running in the background). -p: port fordwarding.
# 1 - docker run -p 3002:3002 -d node-course/web-server
# 2 - docker run -dp 3002:3002 node-course/web-server

# docker logs <container_id>    => Logs del container corriendo.
# docker stop <container_id>    => Frena el container (necesario antes de borrar).
# docker rm <container_id>      => Borra el container.
# docker rmi <image_id>         => Borra la imagen.
