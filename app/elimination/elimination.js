'use strict';

angular.module('elimination', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/elimination', {
        templateUrl: 'elimination/elimination.html',
        controller: 'EliminationCtrl'
    });
}])

.controller('EliminationCtrl', ['$scope',
    function($scope) {
        $scope.teams = JSON.parse(localStorage.getItem('teams'));
    }
])