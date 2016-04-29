(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('RoundDialogController', RoundDialogController);

    RoundDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Round', 'Game'];

    function RoundDialogController ($scope, $stateParams, $uibModalInstance, entity, Round, Game) {
        var vm = this;
        vm.round = entity;
        vm.games = Game.query();
        vm.load = function(id) {
            Round.get({id : id}, function(result) {
                vm.round = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('homegameApp:roundUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.round.id !== null) {
                Round.update(vm.round, onSaveSuccess, onSaveError);
            } else {
                Round.save(vm.round, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.date = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
