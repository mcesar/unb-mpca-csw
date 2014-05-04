/**
 * New node file
 */

'use strict';

var mongoose = require('mongoose'),
	filtro = require('./filtroValidacaoParametros'),
	Municipio = mongoose.model('Municipio');
	
	exports.idh = function(req, res) {
		
		if(!filtro.isValidaEntrada(req)) return  res.send(400)
		
		//This function determines the how will be the return of queries below	
		var funcaoRetorno = function (err, municipio) {
		        if (!err) {
		        	return res.json(municipio);
		        } else {
		            return res.send(err);
		        }
		    }	
		
		//This function will be called by the next functions for fetch itens in MongoDB
		var buscaQuery = function(req){
			var query
			if(req.query.uf == '' || req.query.uf == null) query = Municipio.find({});
			else query = Municipio.find({uf: req.query.uf.toUpperCase()});
			return query;
		}
		
		//In the case of ordem='', the default response is in desc
		if (req.query.ordem == '') req.query.ordem = 'desc';
		
		//Bring the result of the query, sorts and executes it
		var query = buscaQuery(req);
		query = query.sort({idh: req.query.ordem.toLowerCase()});
		query.exec(funcaoRetorno);
		
		
		
	}