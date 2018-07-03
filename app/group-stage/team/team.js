'use strict';

angular.module('groupStage.team', [])

.directive('teamCard', function() {
    return {
        controller:  ['$scope', 
            function($scope) {
                console.log($scope.team);
            }
        ],
        restrict: 'E',
        scope: {
            team: '='
        },
        templateUrl: '/group-stage/team/team.html', 
    }
})