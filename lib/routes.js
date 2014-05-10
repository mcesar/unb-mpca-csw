'use strict';

var api = require('./controllers/api'),
	ranking = require ('./controllers/ranking'),
	comparativo = require('./controllers/comparativo'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {
	
  // Route to ranking
  app.get('/api/municipios/ranking/idh', ranking.idh);
  
  //Route to ranking
  app.get('/api/municipios/ranking/investimento', ranking.investimento);
  
  //Route to comparativo
  app.get('/api/municipios/comparativo', comparativo.comparacao);
  
  // Route to municipios
  app.get('/api/municipios', api.municipios);
  

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
  
  // in the case of an attacker threats the interface by post
  app.post('/api/municipios', function(req, res) {
	  res.send(405);
  });
  
  // in the case of an attacker threats the interface by put
  app.put('/api/municipios', function(req, res){
	  res.send(405);
  });
  
//in the case of an attacker threats the interface by delete
  app.delete('/api/municipios', function(req, res){
	  res.send(405);
  });
};