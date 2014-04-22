'use strict';

angular.module('unbMpcaCswApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
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
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });
