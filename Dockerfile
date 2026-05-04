<<<<<<< HEAD
# build
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# producción
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
=======
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
>>>>>>> 56e78b03984f059b1e1f21c937560d6008e93646
