'use strict';

angular.module('groupStage.fixture', [])

.directive('fixture', function() {
    return {
        controller:  ['$scope', 
            function($scope) {
                console.log($scope.game);
            }
        ],
        restrict: 'E',
        scope: {
            game: '='
        },
        templateUrl: '/group-stage/fixture/fixture.html', 
    }
})