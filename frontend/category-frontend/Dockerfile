# Stage 1: Build the Angular App
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY .. .
# For Angular 18 (or whichever version you're using):
RUN npm run build --prod

# Stage 2: Nginx to serve the compiled Angular app
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
