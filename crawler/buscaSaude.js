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

	var municipio = mongoose.model('municipio', { nome: String, cod: String,  uf: String , saude: Number, educacao: Number});

	var ufs = ['AC'//, 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO'
			 //, 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI'
			// , 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
			]
		, concurrency = 1;

	var qtde = "";
	var qtdeMun = "";
	
	async.eachLimit(ufs, concurrency, function (uf, next) {
		var url = format('http://portaldatransparencia.gov.br/PortalTransparenciaListaCidades.asp?Exercicio=2013&SelecaoUF=1&SiglaUF=%s#', uf);
		request(url, function (err, response, body) {
			if (err)
				throw err;
			var $ = cheerio.load(body);
			$('p[class="paginaAtual"]').each(function () {
				var numpag = ($(this).text()).trim();	
				var buscapag = numpag.match(/\//);
				qtde = numpag.substring(buscapag.index + 1, numpag.lenght);
				for (n=1; n<=qtde; n++){
					npgs = n.toString();
					//falta pegar todos os anos
					var url = format('http://portaldatransparencia.gov.br/PortalTransparenciaListaCidades.asp?Exercicio=2013&SelecaoUF=1&SiglaUF=%s&Pagina=%s#',uf, npgs.toString());
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
									//console.log(qtdePagMun)									 
									for (x=1; x<=qtdePagMun; x++){
									 	px = '&Pagina=' + x + '#';
										var urlMunPag = urlMun + px;
										//console.log(urlMunPag);
										
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
														//console.log(saude);
														//console.log('OBTIDO com sucesso: %s - %s - %s - %s - %s', uf, nome, cod, saude, educacao);
													}	
												    var buscaEdu = hrefInv.match(/CodFuncao=12/);	
													if (buscaEdu != null){										   
													   var buscaValorEdu = hrefInv.match(/ValorAcao=/);
														educacao = educacao + Number(((hrefInv.substring(buscaValorEdu.index + 10, hrefInv.lenght )).replace(/\./g,'')).replace(',','.'));
														//console.log(educacao);
														//console.log('OBTIDO com sucesso: %s - %s - %s - %s - %s', uf, nome, cod, saude, educacao);
													}											
													if (xx==qtdePagMun && i == e1.length-1 && j == e2.length-1) {
														var entrada = new municipio({ nome: nome, cod: cod, uf: uf, saude: saude, educacao:educacao});
														entrada.save(function(err){
															if(err) 
																throw err;
															//console.log('SALVO com sucesso: %s - %s - %s - %s - %s', uf, nome, cod, saude, educacao);
															console.log(xx + ' ' + qtdePagMun  + ' ' +  i  + ' ' +  (e1.length-1)  + ' ' +  j  + ' ' +  (e2.length-1));
														});
													} else {
														//console.log(xx + ' ' + qtdePagMun  + ' ' +  i  + ' ' +  (e1.length-1)  + ' ' +  j  + ' ' +  (e2.length-1));
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
