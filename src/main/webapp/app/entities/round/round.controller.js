(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('RoundController', RoundController);

    RoundController.$inject = ['$scope', '$state', 'Round'];

    function RoundController ($scope, $state, Round) {
        var vm = this;
        vm.rounds = [];
        vm.loadAll = function() {
            Round.query(function(result) {
                vm.rounds = result;
            });
        };

        vm.loadAll();
        
    }
})();
