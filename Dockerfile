# Build Stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

# Change nginx stage to serve Angular/Vue/React frontend properly
FROM nginx:alpine

# Add a custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the correct build folder (Check your dist folder name)
COPY --from=build /app/dist/ecommerce_frontend /usr/share/nginx/html

EXPOSE 80
