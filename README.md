# CodeRockr Application

> Software for coderockr challenge

[![Build Status](https://travis-ci.org/renatobenks/CodeRockrApplication.svg?branch=master)](https://travis-ci.org/renatobenks/CodeRockrApplication)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/200adf02253c453abda33f348e73f5d4)](https://www.codacy.com/app/renato-benkendorf/CodeRockrApplication?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=renatobenks/CodeRockrApplication&amp;utm_campaign=Badge_Grade)

Docker *(recommended)*
---
Ao invés de usar seu ambiente local para rodar a 
aplicação, você pode usar o ambiente configurado
do Docker para instalar as devidas dependencias 
da aplicação e roda-la.

### Requirements

*Para montar o ambiente da aplicação com o Docker,
você precisa ter o Docker devidamente instalado e 
configurado.*

---

Você simplesmente pode rodar o seguinte comando para
ter a aplicação já rodando:

`````bash
$ docker-compose up -d --build
`````

ou você pode rodar a aplicaçao em partes com os comandos
a seguir:

### Installing dependencies

`````bash
$ docker-compose build
`````

### Run application

`````bash
# Run docker container from app in verbose mode
$ docker-compose up

# Run docker container from app in background mode
$ docker-compose up -d
`````

Local
---
### Requirements

Necessariamente você precisa ter as seguintes dependencias
instaladas localmente na sua máquina:
- node >= 6.1.0
- npm >= 3.8.6

Você pode ver a sua versão do node e npm, respectivamente,
com o seguinte comando:

````bash
# NodeJS version
$ node -v

# npm version
$ npm -v
````

### Installing

`````bash
$ npm install
`````

### Running
#### Run app on development mode:

`````bash
$ npm start
`````

#### Run app on production mode:

`````bash
$ npm run production
`````
