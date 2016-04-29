(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('ScoreController', ScoreController);

    ScoreController.$inject = ['$scope', '$state', 'Score'];

    function ScoreController ($scope, $state, Score) {
        var vm = this;
        vm.scores = [];
        vm.loadAll = function() {
            Score.query(function(result) {
                vm.scores = result;
            });
        };

        vm.loadAll();
        
    }
})();
