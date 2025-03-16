FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

# Copy the built Angular app to Nginx's HTML directory
COPY --from=build /app/dist/ecommerce_frontend /usr/share/nginx/html

# Copy the custom nginx.conf file
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
