'use strict';

angular.module('resourceService', [
    'ngResource'
])

.factory('GroupsRaw', ['$resource', 
    function($resource) {
        return $resource('resources/groups.json');
    }
]);
