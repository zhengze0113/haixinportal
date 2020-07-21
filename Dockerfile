FROM nginx:latest

COPY config/console.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/app/console/dist/

CMD ["/bin/bash", "-c", "sed -i \"s@<html@<html data-promise-base-url=\"$API_BASE_URL\"@\" /usr/app/console/dist/index.html; nginx -g \"daemon off;\""]

