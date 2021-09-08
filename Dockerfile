FROM node:14.17.6-alpine AS builder

ARG envname=development
ARG port=5010
ARG modulename=agv

WORKDIR /usr/src/app
COPY *.npmrc ./
COPY *.json ./
COPY *.js ./
COPY ./src ./src
RUN apk add --no-cache git
RUN npm install
RUN node ./build.js ${envname} ${port} ${modulename}

FROM node:14.17.6-alpine

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./

RUN npm ci --quiet --only=production

EXPOSE  8088

CMD [ "node", "index.js" ]