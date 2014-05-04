'use strict';

var mongoose = require('mongoose'),
	filtro = require('./filtroValidacaoParametros'),
	Municipio = mongoose.model('Municipio');
	
	exports.municipios = function(req, res) {
		    
		if(!filtro.isValidaEntrada(req)) return  res.send(400)
	   
		
		//This function determines the how will be the return of queries below	
		var funcaoRetorno = function (err, municipio) {
		        if (!err) {
		        	return res.json(municipio);
		        } else {
		            return res.send(err);
		        }
		    }	
		
		//Case in that there isn't any parameter
		if(req.query.nome == null && req.query.id ==null && req.query.uf ==null){
				Municipio.find({}, funcaoRetorno);
		}
		
		//Case in that the parameter "name" is different of null
		if (req.query.nome != null){
			Municipio.find({nome: new RegExp(req.query.nome.toUpperCase())}, funcaoRetorno);
		}
		
		
		//Case in that the parameter "id" is different of null
		if (req.query.id != null){
			Municipio.find({_id: req.query.id }, funcaoRetorno);
		}
	

		//Case in that the parameter "UF" is different of null
		if (req.query.uf != null){
			Municipio.find({uf: req.query.uf.toUpperCase() }, funcaoRetorno);
		}
		
		//
	};
	