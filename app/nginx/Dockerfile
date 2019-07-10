# docker build --tag kengotoda/ots-nginx .

FROM staticfloat/nginx-certbot

ENV APP_DOMAIN=localhost
COPY nginx.template /etc/nginx/nginx.template
CMD ["/bin/bash", "-c", "host='$host' remote_addr='$remote_addr' envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/ && /scripts/entrypoint.sh"]
