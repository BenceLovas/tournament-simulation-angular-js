'use strict';

angular.module('resourceService', [
    'ngResource'
])

.factory('groupDataService', ['$resource', 
    function($resource) {
        return $resource('resources/groups.json');
    }
])

.factory('playerDataService', ['$resource',
    function($resource) {
        return $resource('https://randomuser.me/api/?results=11');
    }
])
