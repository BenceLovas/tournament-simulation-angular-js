'use strict';

angular.module('groupStage', [
  'ngRoute', 
  'groupStage.header',
  'groupStage.team', 
  'groupStage.fixture',
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/group-stage', {
    templateUrl: 'group-stage/group-stage.html',
    controller: 'GroupStageCtrl'
  });
}])

.controller('GroupStageCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.proceedToElimination = function() {
      $location.path('/elimination');
    };
    $scope.isProceedToEliminationDisabled = true;
    $scope.isNextRoundDisabled = false;
    $scope.groupsOfTeams = [
        [
            'Uruguay',
            'Russia',
            'Saudi Arabia',
            'Egypt',
        ],
        [
            'Spain',
            'Portugal',
            'Iran',
            'Morocco',
        ],
        [
            'France',
            'Denmark',
            'Peru',
            'Australia',
        ],
        [
            'Croatia',
            'Argentina',
            'Nigeria',
            'Iceland',
        ],
        [
            'Brazil',
            'Switzerland',
            'Serbia',
            'Costa Rica',
        ],
        [
            'Sweden',
            'Mexico',
            'South Korea',
            'Germany',
        ],
        [
            'England',
            'Belgium',
            'Tunisia',
            'Panama',
        ],
        [
            'Japan',
            'Senegal',
            'Colombia',
            'Poland',
        ]
    ];
    $scope.groupSigns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',];
    $scope.matchesFinished = 0;
    $scope.groups = [];
    $scope.fillGroups = function() {
        const groups = [];
        for (let i = 0; i < $scope.groupsOfTeams.length; i++) {
            const group = {
                title: 'Group ' + $scope.groupSigns[i],
                teams: [],
                games: [],
            }
            for (let j = 0; j < $scope.groupsOfTeams[i].length; j++) {
                const team = {
                    name: $scope.groupsOfTeams[i][j],
                    played: 0,
                    won: 0,
                    drawn: 0,
                    lost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalDifference: 0,
                    points: 0,
                }
                group.teams.push(team);
            }

            groups.push(group);
        }

        $scope.groups = groups;
    },
    $scope.fillGames = function() {
        for (let i = 0; i < $scope.groups.length; i++) {
            const gamesIndex = [[0, 1], [2, 3], [0, 3], [1, 2], [0, 2], [1, 3]];
            for (let k = 0; k < gamesIndex.length; k++) {
                const game = { 
                    home: { team: $scope.groups[i].teams[gamesIndex[k][0]], score: null },
                    away: { team: $scope.groups[i].teams[gamesIndex[k][1]], score: null },
                };
                $scope.groups[i].games.push(game);
            }
        }
    };
    $scope.playOneRound = function() {
      for (let i = 0; i < $scope.groups.length; i++) {
          for (let j = $scope.matchesFinished; j < $scope.matchesFinished + 2; j++) {
              const homeTeamScore = Math.floor(Math.random() * 5);
              const awayTeamScore = Math.floor(Math.random() * 5);
              $scope.groups[i].games[j].home.score = homeTeamScore;
              $scope.groups[i].games[j].away.score = awayTeamScore;
          }
      }
      $scope.updateTableData();
      $scope.matchesFinished += 2;
      if ($scope.matchesFinished === 6) {
       $scope.isNextRoundDisabled = true; 
       $scope.isProceedToEliminationDisabled = false;
       const advancedTeams = [];
       for (let i = 0; i < $scope.groups.length; i++) {
           advancedTeams.push({ name: $scope.groups[i].teams[0].name, score: null });
           advancedTeams.push({ name: $scope.groups[i].teams[1].name, score: null });
       }
       localStorage.setItem('teams', JSON.stringify(advancedTeams));
      }
    };
    $scope.updateTableData = function() {
      for (let groupIndex = 0; groupIndex < $scope.groups.length; groupIndex++) {
          for (let gameIndex = $scope.matchesFinished; gameIndex < $scope.matchesFinished + 2; gameIndex++) {
              
              for (let teamIndex = 0; teamIndex < $scope.groups[groupIndex].teams.length; teamIndex++) {
                  if ($scope.groups[groupIndex].teams[teamIndex].name === $scope.groups[groupIndex].games[gameIndex].home.team.name) {
                      $scope.groups[groupIndex].teams[teamIndex].played += 1;
                      $scope.groups[groupIndex].teams[teamIndex].goalsFor += $scope.groups[groupIndex].games[gameIndex].home.score;
                      $scope.groups[groupIndex].teams[teamIndex].goalsAgainst += $scope.groups[groupIndex].games[gameIndex].away.score;
                      $scope.groups[groupIndex].teams[teamIndex].goalDifference = $scope.groups[groupIndex].teams[teamIndex].goalsFor - $scope.groups[groupIndex].teams[teamIndex].goalsAgainst;
                      if ($scope.groups[groupIndex].games[gameIndex].home.score > $scope.groups[groupIndex].games[gameIndex].away.score) {
                          $scope.groups[groupIndex].teams[teamIndex].won += 1;
                          $scope.groups[groupIndex].teams[teamIndex].points += 3;
                      } else if ($scope.groups[groupIndex].games[gameIndex].home.score < $scope.groups[groupIndex].games[gameIndex].away.score) {
                          $scope.groups[groupIndex].teams[teamIndex].lost += 1;
                      } else {
                          $scope.groups[groupIndex].teams[teamIndex].drawn += 1;
                          $scope.groups[groupIndex].teams[teamIndex].points += 1;
                      }
                  }

                  if ($scope.groups[groupIndex].teams[teamIndex].name === $scope.groups[groupIndex].games[gameIndex].away.team.name) {
                      $scope.groups[groupIndex].teams[teamIndex].played += 1;
                      $scope.groups[groupIndex].teams[teamIndex].goalsFor += $scope.groups[groupIndex].games[gameIndex].away.score;
                      $scope.groups[groupIndex].teams[teamIndex].goalsAgainst += $scope.groups[groupIndex].games[gameIndex].home.score;
                      $scope.groups[groupIndex].teams[teamIndex].goalDifference = $scope.groups[groupIndex].teams[teamIndex].goalsFor - $scope.groups[groupIndex].teams[teamIndex].goalsAgainst;
                      if ($scope.groups[groupIndex].games[gameIndex].away.score > $scope.groups[groupIndex].games[gameIndex].home.score) {
                          $scope.groups[groupIndex].teams[teamIndex].won += 1;
                          $scope.groups[groupIndex].teams[teamIndex].points += 3;
                      } else if ($scope.groups[groupIndex].games[gameIndex].away.score < $scope.groups[groupIndex].games[gameIndex].home.score) {
                          $scope.groups[groupIndex].teams[teamIndex].lost += 1;
                      } else {
                          $scope.groups[groupIndex].teams[teamIndex].drawn += 1;
                          $scope.groups[groupIndex].teams[teamIndex].points += 1;
                      }
                  }
              }
          }
          $scope.groups[groupIndex].teams.sort((a, b) => {return b.points - a.points || b.goalDifference - a.goalDifference || b.goalsFor - a.goalsFor})
      }
    }; 
    $scope.fillGroups();
    $scope.fillGames();
  }
]);