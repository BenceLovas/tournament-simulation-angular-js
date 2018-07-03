'use strict';

angular.module('groupStage.fixture', [])

.directive('fixture', function() {
    return {
        controller:  ['$scope', 
            function($scope) {
                $scope.isFixtureVisible = false;
                $scope.toggleFixture = function() {
                    $scope.isFixtureVisible = !$scope.isFixtureVisible;
                };
            }
        ],
        restrict: 'E',
        scope: {
            games: '='
        },
        templateUrl: '/group-stage/fixture/fixture.html', 
    }
})