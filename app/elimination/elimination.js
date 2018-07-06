'use strict';

angular.module('elimination', [
    'ngRoute',
    'resourceService',  
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/elimination', {
        templateUrl: 'elimination/elimination.html',
        controller: 'EliminationCtrl'
    });
}])

.controller('EliminationCtrl', ['$scope', '$interval', 'playerDataService',
    function($scope, $interval, playerDataService) {
        $scope.currentPairs = JSON.parse(localStorage.getItem('teams'));
        $scope.winner = '';
        $scope.intervalId = null;
        $scope.inProgress = false;
        $scope.isPlayDisabled = false;
        $scope.isPauseDisabled = true;
        $scope.stages = [];
        $scope.isRequestAvailable = false;
        $scope.playersInModal = [];
        $scope.isModalVisible = false;
        $scope.closeModal = function() {
            $scope.isModalVisible = false;
        };
        $scope.getPlayers = function() {
            if ($scope.isRequestAvailable) {
                $scope.isRequestAvailable = false;
                playerDataService.get(function(data) {
                    $scope.playersInModal = data.results;
                    $scope.isRequestAvailable = true;
                    $scope.isModalVisible = true;
                });
            }
        };
        $scope.shuffleTeams = function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };
        $scope.pairTeams = function() {
            const pairs = [];
            for (let i = 0; i < $scope.currentPairs.length; i+=2) {
                const tempArray = [];
                tempArray.push($scope.currentPairs[i]);
                tempArray.push($scope.currentPairs[i + 1]);
                pairs.push(tempArray);
            }
            $scope.currentPairs = pairs;
        };
        $scope.getScoresForTeams = function() {
            for (let i = 0; i < $scope.currentPairs.length; i++) {
                let scoreOne = Math.floor(Math.random() * 8);
                let scoreTwo;
                do {
                    scoreTwo = Math.floor(Math.random() * 8);
                } while(scoreOne === scoreTwo);
                $scope.currentPairs[i][0].score = scoreOne;
                $scope.currentPairs[i][1].score = scoreTwo;
            }
        };
        $scope.eliminateTeams = function() {
            const remaining = [];
            for (let i = 0; i < $scope.currentPairs.length; i++) {
                remaining.push($scope.currentPairs[i][0].score > $scope.currentPairs[i][1].score ? $scope.currentPairs[i][0] : $scope.currentPairs[i][1]);
            }
            console.log("REMAINING", remaining);
            $scope.currentPairs = remaining;
        };
        $scope.getWinner = function() {
            $scope.winner = $scope.currentPairs[0][0].score > $scope.currentPairs[0][1].score ? $scope.currentPairs[0][0].name : $scope.currentPairs[0][1].name;
        };
        $scope.play = function() {
            $scope.isPlayDisabled = true;
            $scope.isPauseDisabled = false;
            $scope.isRequestAvailable = false;
            if (!$scope.inProgress) {
                $scope.initialize();
            }
            $scope.intervalId = $interval($scope.elimination, 2000);
        };
        $scope.pause = function() {
            $interval.cancel($scope.intervalId);
            $scope.isPauseDisabled = true;
            $scope.isPlayDisabled = false;
            $scope.isRequestAvailable = true;
        };
        $scope.initialize = function() {
            $scope.inProgress = true;
            $scope.shuffleTeams($scope.currentPairs);
            $scope.pairTeams();
            $scope.getScoresForTeams();
            $scope.stages.push(JSON.parse(JSON.stringify($scope.currentPairs)));

        };
        $scope.elimination = function() {
            if ($scope.currentPairs.length >= 2) {
                $scope.round();
            } else if ($scope.currentPairs.length === 1) {
                $scope.finalize();
            }
        };
        $scope.round = function() {
            $scope.eliminateTeams();
            $scope.pairTeams();
            $scope.getScoresForTeams();
            $scope.stages.push(JSON.parse(JSON.stringify($scope.currentPairs)));
        };
        $scope.finalize = function() {
            $scope.getWinner();
            $interval.cancel($scope.intervalId);
            $scope.isPauseDisabled = true;
        };
    }
])