'use strict';

angular.module('groupStage.team', [])

.directive('teamRow', function() {
    return {
        controller:  ['$scope', 
            function($scope) {
            }
        ],
        restrict: 'E',
        scope: {
            team: '='
        },
        templateUrl: '/group-stage/team/team.html', 
    }
})