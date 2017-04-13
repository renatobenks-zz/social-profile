FROM mhart/alpine-node:6.10
WORKDIR /CodeRockrApplication
COPY . /CodeRockrApplication
RUN npm install
