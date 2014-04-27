'use strict';

var mongoose = require('mongoose'),
	Municipio = mongoose.model('Municipio');
	
	exports.municipios = function(req, res) {
		    
		if(!isValidaEntrada(req)) return  res.send(400)
	   
		
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
	



//This function intends to protect the application against malicious query parameters
var isValidaEntrada = function(req){
	
	var padraoValorMunicipio = new RegExp("^[a-zA-Z0-9.\\-\\/+=_ ]*$", "")
	if (req.query.nome!=null && req.query.nome != req.query.nome.match(padraoValorMunicipio)){ 
		return false;
	}
	
	/*var padraoValorCOD = new RegExp("[0-9]*", "")
	if (req.query.cod!=null && req.query.cod != req.query.cod.match(padraoValorCOD)){ 
		return false;
	}*/
	
	
	var padraoValorUF = new RegExp("[a-zA-Z][a-zA-Z]", "")
	if (req.query.uf!=null && req.query.uf != req.query.uf.match(padraoValorUF)){ 
		return false;
	}
	
	return true;
};