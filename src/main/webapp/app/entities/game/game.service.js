(function() {
    'use strict';
    angular
        .module('homegameApp')
        .factory('Game', Game);

    Game.$inject = ['$resource'];

    function Game ($resource) {
        var resourceUrl =  'api/games/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
