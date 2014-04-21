'use strict';

var unbControllers = angular.module('unbMpcaCswApp');

unbControllers.controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  });

unbControllers.controller('FormCtrl', function ($scope, $http) {
    $scope.enviar = function () {
	if($scope.buscaMunicipio === undefined || $scope.buscaMunicipio.trim() === ""){
		$scope.alerta = "Campo Obrigatório";
		//alert("Pesquisa inválida");
	}else{
		//$scope.formMunicipio.ng-submit();
		document.getElementById("idFormMunicipio").submit();
	}
    };
 });

