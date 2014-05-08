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
				
	};

	exports.investimento = function(req, res){
		
		if(!filtro.isValidaEntrada(req)) return  res.send(400)
		
		var resultado = Municipio
							.aggregate(
							    [{ $project : {
							        nome : 1 ,
							        cod: 1,
							        uf: 1,
							        idh : 1,
							        investimento: {saude: 1, educacao: 1},
							        investimentoTotal: {$add: ["$investimento.saude.2010", "$investimento.saude.2011", "$investimento.saude.2012", "$investimento.saude.2013",
							            "$investimento.educacao.2010", "$investimento.educacao.2011", "$investimento.educacao.2012", "$investimento.educacao.2013"] }
							    }}
							 ])
			
			//In the case of ordem='', the default response is in desc
			if (req.query.ordem == '') req.query.ordem = 'desc';
		
		
			if(!(req.query.uf == '' || req.query.uf == null)) resultado = resultado.match({uf: req.query.uf.toUpperCase()});
		

		
			//Execution of aggregation
			resultado.sort({investimentoTotal: req.query.ordem.toLowerCase()})
						.exec(function (err, municipio) {
					        if (!err) {
					        	return res.json(municipio);
					        } else {
					            return res.send(err);
					        }
					    });
	};

