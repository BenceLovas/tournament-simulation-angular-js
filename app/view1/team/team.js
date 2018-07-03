'use strict';

angular.module('myApp.team', [])

.directive('teamCard', function() {
    return {
        controller:  ['$scope', function($scope) {console.log($scope.team)}],
        restrict: 'E',
        scope: {
            team: '='
        },
        templateUrl: '/view1/team/team.html', 
    }
})