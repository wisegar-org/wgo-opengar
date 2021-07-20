FROM node:12.13.0 AS builder

WORKDIR /usr/src/app
COPY *.npmrc ./
COPY *.json ./
COPY *.js ./
COPY ./src ./src
RUN npm install
RUN npm install typescript -g
RUN tsc

FROM node:12.13.0-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/settings.json ./
COPY --from=builder /usr/src/app/settings.development.json ./
COPY --from=builder /usr/src/app/.npmrc ./
COPY --from=builder /usr/src/app/build ./

RUN npm ci --quiet --only=production

ENV NODE_ENV=development
ENV PORT=8088

EXPOSE  8088
CMD [ "node", "index.js" ]