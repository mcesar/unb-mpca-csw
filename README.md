Getting Started
===

 - Instale e execute o MongoDB
 - Instale o Node.JS
 - Instale o Git
 - Execute `npm install -g yo`, para instalar o Yeoman
 - Execute `npm install -g grunt` para instalar o Grunt
 - Faça um clone desse repositório
 - Execute `npm install` e depois `bower update` de dentro da pasta do projeto
 - Execute `grunt serve` para checar se está tudo funcionando

Para implementar a API
===

 - adicione a URI no arquivo `lib/routes.js`
 - adicione a função correspondente à URI no arquivo `lib/controllers/api.js`

Para implementar a interface HTML
===

 - se for alterar a página principal, edite o arquivo `app/views/index.html`
 - se for criar alguma outra página, inclua o arquivo html em `app/views/partials` e adicione a rota para ele em `app/scripts/app.js`
 - o javascript usado pelas páginas deve ficar em `app/scripts/controllers/main.js`

Para alterar o modelo de dados
===

 - acrescente (ou modifique) o arquivo `municipio.js` na pasta `lib/models` seguindo o exemplo do arquivo `models/thing.js`

Para testar automaticamente
===
 
acrescente os arquivos de teste na pasta `test/client/spec` ou `test/server`, seguindo os exemplos que já estão lá, e execute `grunt test`. Se quiser rodar somente os testes de servidor, execute `grunt test:server`, só os do cliente `grunt test:client`.

Ao testar a interface HTML, pode ser necessário usar o `ngMock` para simular a API REST.

Para executar o crawler e popular o banco
===

 - De dentro da pasta do projeto, execute `npm install request`
 - De dentro da pasta do projeto, execute `npm install cheerio`
 - De dentro da pasta do projeto, execute `npm install async`
 - De dentro da pasta `crawler`, execute `node buscaMunicipios.js`

Para publicar no ambiente de produção
===

Para clonar o repositório do heroku, execute:

```
heroku git:clone -a unb-mpca-csw dist
```

Para fazer um _deploy_ no _heroku_, execute
 
```
grunt build
cd dist
git add -A .
git commit -m "deploy"
git push heroku master
```