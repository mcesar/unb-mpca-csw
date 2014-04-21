'use strict';

var mongoose = require('mongoose');
   
/*
mongoose.createConnection('mongodb://localhost/unb_csw');
var db = mongoose.connection;
db.on('error', console.error);

db.once('open', function(req, res) {
*/
	var Municipio = mongoose.model('Municipio');
	
	exports.municipios = function(req, res) {
		    
		if(!isValidaEntrada(req)) return  res.send(400)
	   
		
		
		//exemplo de consulta que aparentemente está retornando o registros corretos
		/*Municipio.find({nome: 'XAPURI'}, function (err, municipio) {
	        if (!err) {
	        	return res.json(municipio);
	        } else {
	            return res.send(err);
	        }
	    });*/
		
		//TODO: Ajeitar as condições de validação para que essa consulta só retorne se a query string for vazia
		if(res.query.nome == null)
			Municipio.find({}, function (err, municipio) {
	        if (!err) {
	        	return res.json(municipio);
	        } else {
	            return res.send(err);
	        }
	    });
		
		//TODO: Ajeitar as condições de validação para que essa consulta retorne pelo padrão da String "nome"
		if(res.query.nome == null)
			Municipio.find({}, function (err, municipio) {
	        if (!err) {
	        	return res.json(municipio);
	        } else {
	            return res.send(err);
	        }
	    });
		
		
		
		
	};
	
//});

	




/**
 * Get awesome things
 */
/*exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};
	
/**
 * Retorna JSON dos municípios
 *
 * @param req
 * @param res
 * @returns {}
 */




//This function intends to protect the application against malicious query parameters
var isValidaEntrada = function(req){
	
	var padraoValorMunicipio = new RegExp("^[a-zA-Z0-9.\\-\\/+=_ ]*$", "")
	if (req.query.nome!=null && req.query.nome != req.query.nome.match(padraoValorMunicipio)){ 
		return false;
	}
	
	var padraoValorCOD = new RegExp("[0-9]*", "")
	if (req.query.cod!=null && req.query.cod != req.query.cod.match(padraoValorCOD)){ 
		return false;
	}
	
	
	var padraoValorUF = new RegExp("[a-zA-Z][a-zA-Z]", "")
	if (req.query.uf!=null && req.query.uf != req.query.uf.match(padraoValorUF)){ 
		return false;
	}
	
	return true;
};