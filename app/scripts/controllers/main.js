'use strict';

var unbControllers = angular.module('unbMpcaCswApp');

unbControllers.controller('MainCtrl', function ($scope, $http) {
});

unbControllers.controller('FormCtrl', function ($scope, $location, $rootScope) {
    $scope.enviar = function () {
	if($scope.buscaMunicipio === undefined || $scope.buscaMunicipio.trim() === ""){
		$scope.alerta = "Campo Obrigatório";
	}else{
		$scope.alerta = "";
		$rootScope.paramMunicipio = $scope.accentsTidy($scope.buscaMunicipio);
		$location.path("consultaMunicipiosResultado");
	}
    };

    $scope.linkRanking = function(opt) {
		$rootScope.rankingSelected = opt;
		$location.path("consultaRanking");
		//alert($location.path());
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

unbControllers.controller('consultaMunicipiosResultadoCtrl', function ($http, $scope, $rootScope) {
	$http.get("http://"+window.location.host+'/api/municipios?nome='+$rootScope.paramMunicipio).success(function(data, status, header, config) {
		$scope.listaMunicipios = data;
	}).error(function(data, status, header, config) {
	   	$scope.alerta = "Erro ao buscar municipio: "+status;
	});
 });

 unbControllers.controller('detalhaMunicipioCtrl', function ($scope, $http, $routeParams) {
	$http.get('/api/municipios?id='+$routeParams.municipioId).success(function(arrayMunicipios) {
		$scope.municipio = arrayMunicipios[0];
	});
 });
 
 unbControllers.controller('consultaRankingCtrl', function ($scope, $http, $rootScope, $routeParams) {
	$scope.rankingString = $rootScope.rankingSelected;
 });


  unbControllers.controller('graficoCtrl', function($scope, $http, $routeParams) {
	
	$scope.data = {
		series: ['Saúde', 'Educação'],
		data : [{
			x : "2010",
			y: [100,500],
			tooltip:"this is tooltip"
		},
		{
			x : "2011",
			y: [300, 100]
		}, 
		{
			x : "2012",
			y: [300, 100]
		},
		{
			x : "2013",
			y: [300, 100]
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

