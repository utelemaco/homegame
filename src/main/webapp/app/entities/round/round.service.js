(function() {
    'use strict';
    angular
        .module('homegameApp')
        .factory('Round', Round);

    Round.$inject = ['$resource', 'DateUtils'];

    function Round ($resource, DateUtils) {
        var resourceUrl =  'api/rounds/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.date = DateUtils.convertDateTimeFromServer(data.date);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
