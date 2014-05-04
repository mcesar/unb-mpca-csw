'use strict';

angular.module('unbMpcaCswApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'angularCharts'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/consultaMunicipios',
        controller: 'MainCtrl'
      })
	  .when('/consultaMunicipiosResultado', {
        templateUrl: 'partials/consultaMunicipiosResultado',
        controller: 'consultaMunicipiosResultadoCtrl'
      })
	  .when('/municipio/:municipioId', {
        templateUrl: 'partials/municipio',
        controller: 'detalhaMunicipioCtrl'
      })
	  .when('/consultaRanking', {
        templateUrl: 'partials/consultaRanking',
        controller: 'consultaRankingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });
