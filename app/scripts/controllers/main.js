'use strict';

var unbControllers = angular.module('unbMpcaCswApp');

unbControllers.controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });

unbControllers.controller('FormCtrl', function ($scope, $location, $rootScope) {
    $scope.enviar = function () {
	if($scope.buscaMunicipio === undefined || $scope.buscaMunicipio.trim() === ""){
		$scope.alerta = "Campo Obrigatório";
	}else{
		$scope.alerta = "";
		$rootScope.paramMunicipio = $scope.buscaMunicipio;
		$location.path("consultaMunicipiosResultado");
	}
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