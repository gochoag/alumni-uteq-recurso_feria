FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY index.html styles.css script.js /usr/share/nginx/html/
COPY img/ /usr/share/nginx/html/img/

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/logs

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
