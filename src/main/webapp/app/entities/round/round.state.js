(function() {
    'use strict';

    angular
        .module('homegameApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('round', {
            parent: 'entity',
            url: '/round',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'homegameApp.round.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/round/rounds.html',
                    controller: 'RoundController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('round');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('round-detail', {
            parent: 'entity',
            url: '/round/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'homegameApp.round.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/round/round-detail.html',
                    controller: 'RoundDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('round');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Round', function($stateParams, Round) {
                    return Round.get({id : $stateParams.id});
                }]
            }
        })
        .state('round.new', {
            parent: 'round',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/round/round-dialog.html',
                    controller: 'RoundDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                date: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('round', null, { reload: true });
                }, function() {
                    $state.go('round');
                });
            }]
        })
        .state('round.edit', {
            parent: 'round',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/round/round-dialog.html',
                    controller: 'RoundDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Round', function(Round) {
                            return Round.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('round', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('round.delete', {
            parent: 'round',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/round/round-delete-dialog.html',
                    controller: 'RoundDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Round', function(Round) {
                            return Round.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('round', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
