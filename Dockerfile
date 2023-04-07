FROM node:18 as node
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=node /app/dist/pdi-01 /usr/share/nginx/html
COPY ./nginx/nginx-custom.conf /etc/nginx/conf.d/default.conf
