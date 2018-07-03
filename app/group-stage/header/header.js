'use strict';

angular.module('groupStage.header', [])

.directive('header', function() {
    return  {
        controller: ['$scope', 
            function($scope) {
                $scope.headers = ['Pld', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'];
            }
        ],
        restrict: 'E',
        scope: {
            title: '='
        },
        templateUrl: '/group-stage/header/header.html',
    }
})