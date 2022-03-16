FROM nginx:alpine
COPY ssl_certs /etc/ssl_certs
COPY conf.d/upstream.conf /etc/nginx/conf.d/
COPY strapi.conf /etc/nginx/conf.d/default.conf
COPY build /www/
EXPOSE 80 443
