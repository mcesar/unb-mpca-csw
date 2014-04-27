/**
 * New node file
 */

'use strict';

var mongoose = require('mongoose'),
	Municipio = mongoose.model('Municipio');
	
	exports.idh = function(req, res) {
		
		
		//This function determines the how will be the return of queries below	
		var funcaoRetorno = function (err, municipio) {
		        if (!err) {
		        	return res.json(municipio);
		        } else {
		            return res.send(err);
		        }
		    }	
		
		// This function returns all municipios order by idh desc
		if (req.query.ordem == '' || req.query.ordem.toLowerCase() == 'desc'){
			
			var query = Municipio.find({});
			query = query.sort({idh: 'desc'});
			query.exec(funcaoRetorno);
		}// This function returns all municipios order by idh desc
		else if (req.query.ordem == 'asc'){
			
			var query = Municipio.find({});
			query = query.sort({idh: 'asc'});
			query.exec(funcaoRetorno);
		}
		//This function intends to treat possible abuses in this ranking
		else return res.send(400);
		
	}