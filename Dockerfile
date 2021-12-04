FROM node:16-alpine as development

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn global add @nestjs/cli && yarn install
COPY . .
RUN yarn build

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/dist ./dist
RUN yarn install --production
CMD ["yarn", "start:prod"]
