(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('GameController', GameController);

    GameController.$inject = ['$scope', '$state', 'Game'];

    function GameController ($scope, $state, Game) {
        var vm = this;
        vm.games = [];
        vm.loadAll = function() {
            Game.query(function(result) {
                vm.games = result;
            });
        };

        vm.loadAll();
        
    }
})();
