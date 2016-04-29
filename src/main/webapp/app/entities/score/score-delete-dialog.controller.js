(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('ScoreDeleteController',ScoreDeleteController);

    ScoreDeleteController.$inject = ['$uibModalInstance', 'entity', 'Score'];

    function ScoreDeleteController($uibModalInstance, entity, Score) {
        var vm = this;
        vm.score = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Score.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
