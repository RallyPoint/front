################################################
# Stage 1: Serve Angular app from NGINX Srver  #
################################################
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN apk add --update nodejs nodejs-npm


WORKDIR /usr/src/app
COPY . .
RUN npm install && npm run build:ssr
RUN cp -rf /usr/src/app/dist/rallypointtech/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD [ "./ci/run-prod.sh" ]
