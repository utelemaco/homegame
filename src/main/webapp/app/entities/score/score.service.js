(function() {
    'use strict';
    angular
        .module('homegameApp')
        .factory('Score', Score);

    Score.$inject = ['$resource'];

    function Score ($resource) {
        var resourceUrl =  'api/scores/:id';

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
