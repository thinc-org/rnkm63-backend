FROM node:14-alpine AS build

WORKDIR /usr/src/app

# Install dependencies
COPY ["package.json", "yarn.lock", "./"]
RUN yarn

# Build the app
COPY . .
RUN yarn build

FROM node:14-alpine

ENV NODE_ENV production
WORKDIR /usr/src/app

RUN apk add postgresql-client

COPY ["package.json", "yarn.lock", "./"]
RUN yarn

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD yarn typeorm:prod migration:run && yarn start:prod
