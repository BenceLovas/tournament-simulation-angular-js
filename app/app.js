'use strict';

// Declare app level module which depends on views, and components
angular.module('tournamentSimulation', [
  'ngRoute',
  'groupStage',
  'myApp.view2',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/group-stage'});
}]);
