var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , mongoose = require ('mongoose') 
  , format = require('util').format;

mongoose.connect('mongodb://localhost/unb_csw');

var db = mongoose.connection;

var dados = db.collection('idhs');
dados.remove({},function(err,numRem){
           console.log('limpa o banco antes de inserir os idhs' + numRem);
});
db.on('error', console.error);
db.once('open', function() {
	console.log('Conectado ao MongoDB.')
				
	var idh = mongoose.model('idh', { uf: String, nome: String, idhsaude: String,  idheducacao: String });
	
	var url = format('http://www.pnud.org.br/atlas/ranking/Ranking-IDHM-Municipios-2010.aspx');
	request(url, function (err, response, body) {
		if (err)
			throw err;
		var $ = cheerio.load(body);					
		var td=0;
		var nome;
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
				  }
				if(td==4)
				   idhsaude = ($(this).text());
				if(td==5){
				   idheducacao = ($(this).text());  					
					var entrada = new idh({ uf: uf, nome: nome, idhsaude: idhsaude, idheducacao: idheducacao});
					entrada.save(function(err){
						if(err) 
						    throw err;
					    console.log('%s-%s-%s-%s', entrada.uf, entrada.nome, entrada.idhsaude, entrada.idheducacao);
					});		
					td=-1;
				}
				td ++;						
		});			
	});
});		
