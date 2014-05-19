var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , mongoose = require ('mongoose') 
  , format = require('util').format;

mongoose.connect('mongodb://localhost/unb_csw');

var db = mongoose.connection;

var dados = db.collection('municipios');
dados.remove({},function(err,numRem){
           console.log('limpa o banco antes de inserir os municipios: ' + numRem);
});
db.on('error', console.error);
db.once('open', function() {
	console.log('Conectado ao MongoDB.')

	var municipio = mongoose.model('municipio', { nome: String, cod: String,  uf: String, idh: Number, investimento: { saude: {"2010": Number, "2011": Number, "2012": Number, "2013": Number}, educacao: {"2010": Number, "2011": Number, "2012": Number, "2013": Number} } });

	var ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO'
			 , 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI'
			 , 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
			]
		, concurrency = 1;

	['2010','2011','2012','2013'].forEach(function (ano) {
		async.eachLimit(ufs, concurrency, function (uf, next) {
			var url = format('http://portaldatransparencia.gov.br/PortalTransparenciaListaCidades.asp?Exercicio=' + ano + '&SelecaoUF=1&SiglaUF=%s#', uf);
			request(url, function (err, response, body) {
				if (err)
					throw err;
				var $ = cheerio.load(body);
				var qtde = "";
				var qtdeMun = "";
				$('p[class="paginaAtual"]').each(function () {
					var numpag = ($(this).text()).trim();	
					var buscapag = numpag.match(/\//);
					qtde = numpag.substring(buscapag.index + 1, numpag.lenght);
					for (n=1; n<=qtde; n++){
						npgs = n.toString();						
						var url = format('http://portaldatransparencia.gov.br/PortalTransparenciaListaCidades.asp?Exercicio=' + ano + '&SelecaoUF=1&SiglaUF=%s&Pagina=%s#',uf, npgs.toString());
						request(url, function (err, response, body) {
							if (err)
								throw err;
							var $ = cheerio.load(body);
							$('a[href^="PortalTransparenciaListaAcoes.asp"]').each(function () {
								var href = $(this).attr('href');
								var nome = ($(this).text()).trim();	
								var busca = href.match(/CodMun/);
								var cod = href.substring(busca.index + 7, busca.index + 11);
								var saude = 0;
								var educacao = 0;							
								var urlMun = 'http://portaldatransparencia.gov.br/' + href;
								
								request(urlMun, function (err, response, body){
									if (err)
									  throw err;								  
									var $ = cheerio.load(body);
									var e1 = $('p[class="paginaAtual"]');
									e1.each(function (i) {
										var pag = ($(this).text()).trim();	
										var buscapag2 = pag.match(/\//);
										qtdePagMun = pag.substring(buscapag2.index + 1, pag.lenght); 
										for (x=1; x<=qtdePagMun; x++){
											px = '&Pagina=' + x + '#';
											var urlMunPag = urlMun + px;
											(function  (xx) {
												request(urlMunPag, function (err, response, body){
													if (err)
													  throw err;												
													var $ = cheerio.load(body);	
													var e2 =$('a[href^="PortalTransparenciaListaFavorecidos.asp?"]')
													e2.each(function (j){
														var hrefInv = $(this).attr('href');								
														var buscaSaude = hrefInv.match(/CodFuncao=10/);
														if (buscaSaude != null){										   
															var buscaValor = hrefInv.match(/ValorAcao=/);
															saude = saude + Number(((hrefInv.substring(buscaValor.index + 10, hrefInv.lenght )).replace(/\./g,'')).replace(',','.'));														
														}	
														var buscaEdu = hrefInv.match(/CodFuncao=12/);	
														if (buscaEdu != null){										   
														   var buscaValorEdu = hrefInv.match(/ValorAcao=/);
															educacao = educacao + Number(((hrefInv.substring(buscaValorEdu.index + 10, hrefInv.lenght )).replace(/\./g,'')).replace(',','.'));														
														}

														if (xx==qtdePagMun && i == e1.length-1 && j == e2.length-1) {
															municipio.find({cod: cod}, function (err, municipios) {
																if (err) throw err;
																var entrada;
																if (municipios.length === 0) {
																	entrada = new municipio({ nome: nome, cod: cod, uf: uf, investimento: {}});
																	entrada.investimento.saude = {}
																	entrada.investimento.educacao = {}
																} else {
																	entrada = municipios[0];
																}
																entrada.investimento.saude[ano] = saude;
																entrada.investimento.educacao[ano] = educacao;
																entrada.save(function(err){
																	if(err) 
																		throw err;

																	console.log(xx + ' ' + qtdePagMun  + ' ' +  i  + ' ' +  (e1.length-1)  + ' ' +  j  + ' ' +  (e2.length-1));
																});
															});
														} 
													});
													next();
												});										
											})(x);
										}
									});
									next();
								})
								
							});
							next();
						});
					}				
				});
			    next();
			});
		});
		
	});
	
});
