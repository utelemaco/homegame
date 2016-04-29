(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('ScoreDetailController', ScoreDetailController);

    ScoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Score', 'User', 'Round'];

    function ScoreDetailController($scope, $rootScope, $stateParams, entity, Score, User, Round) {
        var vm = this;
        vm.score = entity;
        vm.load = function (id) {
            Score.get({id: id}, function(result) {
                vm.score = result;
            });
        };
        var unsubscribe = $rootScope.$on('homegameApp:scoreUpdate', function(event, result) {
            vm.score = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
