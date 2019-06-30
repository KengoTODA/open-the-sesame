# docker build --tag kengotoda/ots-nginx .

FROM nginx:1.17
EXPOSE 80
ENV APP_DOMAIN=localhost
COPY nginx.template /etc/nginx/nginx.template
CMD ["/bin/bash", "-c", "host='$host' remote_addr='$remote_addr' envsubst < /etc/nginx/nginx.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
