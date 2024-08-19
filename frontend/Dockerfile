FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm cache clean --force
COPY . .
RUN npm ci
RUN npm run build --prod

FROM nginx:alpine AS client
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf.template
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
