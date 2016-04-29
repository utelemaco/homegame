(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('GameDetailController', GameDetailController);

    GameDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Game'];

    function GameDetailController($scope, $rootScope, $stateParams, entity, Game) {
        var vm = this;
        vm.game = entity;
        vm.load = function (id) {
            Game.get({id: id}, function(result) {
                vm.game = result;
            });
        };
        var unsubscribe = $rootScope.$on('homegameApp:gameUpdate', function(event, result) {
            vm.game = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
