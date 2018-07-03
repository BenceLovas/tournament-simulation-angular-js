'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.team'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 
  function($scope) {
    $scope.teams = [
      {id: 1, name: 'Real Madrid', score: 0},
      {id: 2, name: 'Liverpool', score: 0},
      {id: 3, name: 'Juventus', score: 0},
      {id: 4, name: 'Arsenal', score: 0},
    ];
  }
]);