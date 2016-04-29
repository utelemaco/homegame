(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('GameDialogController', GameDialogController);

    GameDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Game'];

    function GameDialogController ($scope, $stateParams, $uibModalInstance, entity, Game) {
        var vm = this;
        vm.game = entity;
        vm.load = function(id) {
            Game.get({id : id}, function(result) {
                vm.game = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('homegameApp:gameUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.game.id !== null) {
                Game.update(vm.game, onSaveSuccess, onSaveError);
            } else {
                Game.save(vm.game, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
