(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('RoundDetailController', RoundDetailController);

    RoundDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Round', 'Game'];

    function RoundDetailController($scope, $rootScope, $stateParams, entity, Round, Game) {
        var vm = this;
        vm.round = entity;
        vm.load = function (id) {
            Round.get({id: id}, function(result) {
                vm.round = result;
            });
        };
        var unsubscribe = $rootScope.$on('homegameApp:roundUpdate', function(event, result) {
            vm.round = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
