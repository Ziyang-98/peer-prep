# build step
FROM node:16 as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

ENV PORT 80

# release step
FROM nginx as release
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
