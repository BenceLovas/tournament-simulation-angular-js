'use strict';

angular.module('groupStage.fixture', [])

.directive('fixture', function() {
    return {
        controller:  ['$scope', 
            function($scope) {
                $scope.isFixtureVisible = false;
                $scope.fixtureButtonText = 'SHOW FIXTURES';
                $scope.toggleFixture = function() {
                    $scope.isFixtureVisible = !$scope.isFixtureVisible;
                    $scope.fixtureButtonText = $scope.fixtureButtonText === 'SHOW FIXTURES' ? 'HIDE FIXTURES' : 'SHOW FIXTURES';
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
