(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('RoundDeleteController',RoundDeleteController);

    RoundDeleteController.$inject = ['$uibModalInstance', 'entity', 'Round'];

    function RoundDeleteController($uibModalInstance, entity, Round) {
        var vm = this;
        vm.round = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Round.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
