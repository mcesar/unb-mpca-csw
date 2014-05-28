'use strict';

var unbControllers = angular.module('unbMpcaCswApp');

unbControllers.controller('MainCtrl', function ($scope, $http) {

});

unbControllers.controller('FormCtrl', function ($scope, $location, $rootScope, $filter) {
    $rootScope.selecionarMunicipio = function (lista) {
		var selecionados = [];
		var removidos = [];
		var localizado = 0;
		if($rootScope.listaSelecionados === undefined || ($rootScope.listaSelecionados).length === 0){
			$rootScope.listaSelecionados = [];
			selecionados = $filter('filter')(lista, {checked: true});
			for(var i = 0; i < selecionados.length; i++){
				$rootScope.listaSelecionados.push(selecionados[i]._id);
			};			
	    		
		}else{
			selecionados = $filter('filter')(lista, {checked: true});
			removidos = $filter('filter')(lista, {checked: false});
			for(var i = 0; i < selecionados.length; i++){
				for(var j = 0; j < ($rootScope.listaSelecionados).length; j++) {
					if(selecionados[i]._id === $rootScope.listaSelecionados[j]){
						localizado = 1;
					};  					
				};
				if(localizado === 0){
					$rootScope.listaSelecionados.push(selecionados[i]._id);
				}else{
					localizado = 0;
				};
			};

			for(var i = 0; i < removidos.length; i++){
				for(var j = 0; j < ($rootScope.listaSelecionados).length; j++) {
					if(removidos[i]._id === $rootScope.listaSelecionados[j]){
						$rootScope.listaSelecionados.splice(j,1);
					};  					
				};
			};

		};
    };

    $scope.enviar = function () {
	if($scope.buscaMunicipio === undefined || $scope.buscaMunicipio.trim() === ""){
		$scope.alerta = "Campo Obrigatório";
	}else{
		$scope.alerta = "";
		$rootScope.paramMunicipio = $scope.accentsTidy($scope.buscaMunicipio);
		$location.path("consultaMunicipiosResultado");
	}
    };
	
    $scope.testeAddRootScope = function() {		
		var id1 = "535c7ce16c3e064c15ccf4e9";
		var id2 = "535c7ce16c3e064c15ccf4ea";
		var listaSelecionados = new Array();
		listaSelecionados.push(id1);
		listaSelecionados.push(id2);
		
		$rootScope.listaSelecionados = listaSelecionados;	
	};
	
    $scope.linkRanking = function(opt) {
		if($scope.ordem === undefined){
			alert("Selecione a ordem");
		}
		else {
			var location = "";
			if(opt == "rkInvUF" || opt == "rkInvGeral"){
				location = "/consultaRanking/investimento";
			}
			else if(opt == "rkIDHUF" || opt == "rkIDHGeral"){
				location = "/consultaRanking/IDH";
			}
			location = location + "/" + $scope.ordem;
		
			if(opt === "rkInvUF" || opt === "rkIDHUF"){
				if($scope.selectUF === undefined){
					alert("Selecione a UF");
				}
				else{
					location = location + "/" + $scope.selectUF;
					$location.path(location);
				}
			}
			else {
				$location.path(location);			
			}
		}	
    };

    $scope.accentsTidy = function(s) {
            var r=s.toLowerCase();
            r = r.replace(new RegExp(/[àáâãäå]/g),"a");
            r = r.replace(new RegExp(/æ/g),"ae");
            r = r.replace(new RegExp(/ç/g),"c");
            r = r.replace(new RegExp(/[èéêë]/g),"e");
            r = r.replace(new RegExp(/[ìíîï]/g),"i");
            r = r.replace(new RegExp(/ñ/g),"n");                
            r = r.replace(new RegExp(/[òóôõö]/g),"o");
            r = r.replace(new RegExp(/œ/g),"oe");
            r = r.replace(new RegExp(/[ùúûü]/g),"u");
            r = r.replace(new RegExp(/[ýÿ]/g),"y");
            return r;
        };
 });

unbControllers.controller('consultaMunicipiosResultadoCtrl', function ($http, $scope, $rootScope, $filter) {

	$http.get("http://"+window.location.host+'/api/municipios?nome='+$rootScope.paramMunicipio).success(function(data, status, header, config) {
		for(var i = 0; i < data.length; i++){
			data[i].checked = false;
		}
		if($rootScope.listaSelecionados != undefined){
			for(var i = 0; i < (data).length; i++){
				for(var j =0; j < ($rootScope.listaSelecionados).length; j++){
					if(data[i]._id === $rootScope.listaSelecionados[j]){
						data[i].checked = true;
					}
				}
			};
		};
		$scope.listaMunicipios = data;
		$scope.estiloImg = 'display:none';
		
	}).error(function(data, status, header, config) {
	   	$scope.alerta = "Erro ao buscar municipio: "+status;
	});

 });

 unbControllers.controller('detalhaMunicipioCtrl', function ($scope, $http, $routeParams) {
	$http.get('/api/municipios?id='+$routeParams.municipioId).success(function(arrayMunicipios) {
		$scope.municipio = arrayMunicipios[0];
		
		$scope.data = {
		series: ['Saúde', 'Educação'],
		data : [{
			x : "2010",
			y: [$scope.municipio.investimento["saude"]["2010"], $scope.municipio.investimento["educacao"]["2010"]]
			
		},
		{
			x : "2011",
			y: [$scope.municipio.investimento["saude"]["2011"], $scope.municipio.investimento["educacao"]["2011"]]
		}, 
		{
			x : "2012",
			y: [$scope.municipio.investimento["saude"]["2012"], $scope.municipio.investimento["educacao"]["2012"]]
		},
		{
			x : "2013",
			y: [$scope.municipio.investimento["saude"]["2013"], $scope.municipio.investimento["educacao"]["2013"]]
		}]     
	}

	$scope.chartType = 'bar';

	$scope.config = {
		labels: false,
		title : "Gráfico",
		legend : {
			display:true,
			position:'left'
		}
	}
	
		
	});
 });
 
 
unbControllers.controller('compararCtrl', function ($http, $scope, $rootScope, $filter) {	
	var tamanho = ($rootScope.listaSelecionados).length;
	var stringIds = ("?id=").concat($rootScope.listaSelecionados[0]);
	for(var i=1; i < tamanho; i++){
		stringIds = stringIds.concat("&id=");
		stringIds = stringIds.concat($rootScope.listaSelecionados[i]);			
	}
		
	$http.get("http://"+window.location.host+'/api/municipios/comparativo'+stringIds).success(function(data, status, header, config) {
		$scope.listaSelecionados = data;
		$scope.estiloImg = 'display:none';
			
		// TODO:
		// FALTA passar dados da listaSelecionados para o $scope.selection

			
		//Usar este objeto se quiser levar os dados pra outra tela: 	
		$scope.selection = {
			ids: {},
			objects: []
		};	
		
		$scope.$watch(function() {
			return $scope.selection.ids;
		}, function (values) {     
					$scope.selection.objects = [];
		
					$scope.nomes = [];
					$scope.dados2010 = [];
					$scope.dados2011 = [];
					$scope.dados2012 = [];
					$scope.dados2013 = [];
			
			
					angular.forEach($scope.selection.ids, function(v, k) {
						$scope.selection.objects.push(getCategoryById(k)); 
						//Tirar comentários depois(quando tiver dados no banco)
						v && $scope.nomes.push(getCategoryById(k).nome + " - IDH: " + getCategoryById(k).idh);
						//v && $scope.dados2010.push(10);
						v && $scope.dados2010.push(getCategoryById(k).investimento["educacao"]["2010"] + getCategoryById(k).investimento["saude"]["2010"]);
						//v && $scope.dados2011.push(50);
						v && $scope.dados2011.push(getCategoryById(k).investimento["educacao"]["2011"] + getCategoryById(k).investimento["saude"]["2011"]);
						//v && $scope.dados2012.push(150);
						v && $scope.dados2012.push(getCategoryById(k).investimento["educacao"]["2012"] + getCategoryById(k).investimento["saude"]["2012"]);
						//v && $scope.dados2013.push(50)
						v && $scope.dados2013.push(getCategoryById(k).investimento["educacao"]["2013"] + getCategoryById(k).investimento["saude"]["2013"]);
						criarGrafico();
					});        
		}, true);		
			
		function criarGrafico(){
			$scope.data = {
				series: $scope.nomes,
				data : [{
					x : "2010",
					y: $scope.dados2010
				},
				{
					x : "2011",
					y: $scope.dados2011
				},
				{
					x : "2012",
					y: $scope.dados2012
				},
				{
					x : "2013",
					y: $scope.dados2013
				}
				]     
			}
			
			$scope.chartType = 'bar';
			$scope.config = {
				labels: false,
				title : "Investimentos (Educação + Saúde)",
				legend : {
					display:true,
					position:'right'
				},
				"innerRadius": "0",
				"lineLegend": "traditional"
			}		
		};
			
		function getCategoryById(id) {        
			for (var i = 0; i < $scope.listaSelecionados.length; i++) {			
				if ($scope.listaSelecionados[i]._id == id) {
					//$scope.sometext = scope.selection[i]._id;
					return $scope.listaSelecionados[i];				
				}
			}
		};
		
	}).error(function(data, status, header, config) {
		$scope.alerta = "Erro ao buscar municipios selecionados: "+status;
	});
 });
 
 unbControllers.controller('consultaRankingCtrl', function ($scope, $http, $rootScope, $routeParams, $location) {
	var ufString = "";
	var ufURI = ""
	if($routeParams.uf != undefined){
		ufString = " (Por UF)";
		ufURI = "&uf=" + $routeParams.uf;
	}
	if($routeParams.tipo != 'IDH' && $routeParams.tipo != 'investimento'){
		$location.path("/");
	}
	$scope.rankingString = 'de ' + $routeParams.tipo + ufString;
	
	$http.get('/api/municipios/ranking/' + $routeParams.tipo + '?ordem=' + $routeParams.ordem + ufURI).success(function(arrayMunicipios) {
		for(var i = 0; i < arrayMunicipios.length; i++){
			arrayMunicipios[i].checked = false;
		}
		if($rootScope.listaSelecionados != undefined){
			for(var i = 0; i < (arrayMunicipios).length; i++){
				for(var j =0; j < ($rootScope.listaSelecionados).length; j++){
					if(arrayMunicipios[i]._id === $rootScope.listaSelecionados[j]){
						arrayMunicipios[i].checked = true;
					}
				}
			};
		};
		$scope.listaMunicipios = arrayMunicipios;
		$scope.estiloImg = 'display:none';
	});	
 });








