/**
 * New node file
 */

'use strict';

//This function intends to protect the application against malicious query parameters
	exports.isValidaEntrada = function(req){
	
		
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
	
	if (req.query.ordem!=null && !(req.query.ordem == '' || req.query.ordem.toLowerCase() == 'desc' ||req.query.ordem == 'asc'))
		return false;
	
	return true;
};
