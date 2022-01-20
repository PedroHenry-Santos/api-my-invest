FROM node:16-alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn global add @nestjs/cli@8.0.0 && yarn install

COPY . .

RUN yarn prebuild
RUN yarn build

FROM node:16-alpine as production

USER root

WORKDIR /usr/src/app

RUN apk add --no-cache bash

COPY --from=development /usr/src/app/package.json ./
COPY --from=development /usr/src/app/yarn.lock ./
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/docker ./docker

RUN yarn install --production

RUN yarn global add pm2
RUN pm2 install pm2-logrotate

CMD ["./docker/api/start.sh"]


