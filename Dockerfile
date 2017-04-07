FROM mhart/alpine-node:6.10
ADD . /CodeRockrApplication
WORKDIR /CodeRockrApplication
RUN npm install
