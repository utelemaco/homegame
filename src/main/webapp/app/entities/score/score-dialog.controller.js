(function() {
    'use strict';

    angular
        .module('homegameApp')
        .controller('ScoreDialogController', ScoreDialogController);

    ScoreDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Score', 'User', 'Round'];

    function ScoreDialogController ($scope, $stateParams, $uibModalInstance, entity, Score, User, Round) {
        var vm = this;
        vm.score = entity;
        vm.users = User.query();
        vm.rounds = Round.query();
        vm.load = function(id) {
            Score.get({id : id}, function(result) {
                vm.score = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('homegameApp:scoreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.score.id !== null) {
                Score.update(vm.score, onSaveSuccess, onSaveError);
            } else {
                Score.save(vm.score, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
