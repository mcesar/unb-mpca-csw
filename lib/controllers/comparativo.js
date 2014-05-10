/**
 * New node file
 */

'use strict';

var mongoose = require('mongoose'),
	filtro = require('./filtroValidacaoParametros'),
	Municipio = mongoose.model('Municipio');
	
	exports.comparacao = function(req, res) {
		
		if(req.query.id ==null) return  res.send(400);
		
		var vetor = new Array().concat(req.query.id);
		var padraoValorID = new RegExp("[a-zA-Z0-9]{24}");
		
		
		for (var i = 0; i < vetor.length; i++){
			if (vetor[i] != vetor[i].match(padraoValorID)) return res.send(400);
		}
			
		
		var query = Municipio.find({_id: {$in: vetor}}).sort({idh: -1});
		query.exec( function (err, municipio) {
					   if (!err) {
					        return res.json(municipio);
					   } else {
					        return res.send(err);
					        }}
						);
		
		//var funcaoRetorno = 
		/*else{
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
			 
			 resultado = resultado.match({_id: Object{$in: req.params}}).exec(function (err, municipio) {
					        if (!err) {
					        	return res.json(municipio);
					        } else {
					            return res.send(err);
					        }
					    });
		}*/
		
		
	};