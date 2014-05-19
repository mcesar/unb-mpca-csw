var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , mongoose = require ('mongoose') 
  , format = require('util').format
  , undress = require('undress');

mongoose.connect('mongodb://localhost/unb_csw');

var db = mongoose.connection;
/*
var dados = db.collection('idhs');
dados.remove({},function(err,numRem){
           console.log('limpa o banco antes de inserir os idhs' + numRem);
});
*/
db.on('error', console.error);
db.once('open', function() {
	console.log('Conectado ao MongoDB.')

	var municipio = mongoose.model('municipio', { nome: String, cod: String,  uf: String, idh: Number, investimento: { saude: {"2010": Number, "2011": Number, "2012": Number, "2013": Number}, educacao: {"2010": Number, "2011": Number, "2012": Number, "2013": Number} } });
				
	//var idh = mongoose.model('idh', { uf: String, nome: String, idhsaude: String,  idheducacao: String });
	
	var url = format('http://www.pnud.org.br/atlas/ranking/Ranking-IDHM-Municipios-2010.aspx');
	request(url, function (err, response, body) {
		if (err)
			throw err;
		var $ = cheerio.load(body);					
		var td=0;
		var nome;
		var idh;
		var idhsaude;
		var idheducacao;
		var uf;		
		var busca;	
		$('td').each(function (x) {
		        if(td==1){
				  nome = ($(this).text());		
				  busca = nome.match(/\(/);
				  uf = nome.substring(busca.index +1, busca.index + 3);
			      nome = nome.substring(0, busca.index -1);
			      nome = undress(nome.toUpperCase());
				}
				if(td==2)
				   idh = parseFloat(($(this).text()).replace(',','.'));
				if(td==4)
				   idhsaude = ($(this).text());
				if(td==5) {
					idheducacao = ($(this).text());
					(function (n, u, i) {
						municipio.find({nome: n, uf: u}, function (err, municipios) {
							if (err) throw err;
							var entrada
							if (municipios.length === 0) {
								entrada = new municipio({ nome: n, uf: u, investimento: {}});
								entrada.investimento.saude = {}
								entrada.investimento.educacao = {}
							} else {
								entrada = municipios[0];
							}
							entrada.idh = i;
							entrada.save(function(err){
								if(err) 
								    throw err;
							    console.log('%s-%s-%s', entrada.uf, entrada.nome, entrada.idh);
							});		
						});
					})(nome, uf, idh);
					td=-1;
				}
				td ++;						
		});			
	});
});		
