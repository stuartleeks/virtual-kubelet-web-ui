FROM node:8.10.0-alpine as build

RUN mkdir /web-ui
COPY . /web-ui
RUN cd web-ui && npm run build

FROM nginx:1.15-alpine

COPY --from=build /web-ui/build /usr/share/nginx/html