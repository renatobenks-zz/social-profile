# Stack application

A aplicação foi escrita em React para facilitar
a criação de componentes e o acoplamento deles.

Dessa forma, a stack foi construída para que o
o app fosse constituído da melhor forma.

[webpack 2.x](https://webpack.js.org/)
---
webpack é resumidamente uma ferramenta para
fazer o compile da aplicação que usa 
tecnologias ainda não suportadas por todos os
navegadores.

No contexto da aplicação desenvolvida, foi 
optado por utilizar a versão 2 do webpack por 
motivos de performance na criação do bundle
do app, por ser uma versão estável da 
ferramenta, onde os principais `loaders` usados
no webpack são exemplificados já na nova versão 
do webpack e tanto os novos e os velhos pacotes
serem compatíveis e escritos para essa nova 
versão.

[NodeJS](https://nodejs.org/en/) & [Express](http://expressjs.com/pt-br/)
---
À fim de ter um maior controle da aplicação, ela foi
contruída rodando em um server escrito com Express,
desenvolvido em NodeJS.

### [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
Através do middleware que o webpack dispõe, o 
`webpack-dev-middleware`, pode-se acomplar o bundle da
aplicação através do NodeJS. 

### [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
Para habilitar o hot reloading na aplicação, usando o 
Express, o webpack dispõe o middleware, 
`webpack-hot-middleware`, para que o hot reloading 
seja habilitado no server do Express.
