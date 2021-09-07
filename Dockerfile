FROM node:14.17.6-bullseye AS builder

ARG envname=development
ARG port=5010
ARG modulename=agv

WORKDIR /usr/src/app
COPY *.npmrc ./
COPY *.json ./
COPY *.js ./
COPY ./src ./src
# RUN add-apt-repository ppa:git-core/ppa
# RUN apt update
# RUN apt install git
RUN npm install
RUN node ./build.js ${envname} ${port} ${modulename}
RUN ls ./build

FROM node:14.17.6-bullseye

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./

RUN npm ci --quiet --only=production

EXPOSE  8088
CMD [ "node", "index.js" ]