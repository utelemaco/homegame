'use strict';

describe('Controller Tests', function() {

    describe('Score Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockScore, MockUser, MockRound;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockScore = jasmine.createSpy('MockScore');
            MockUser = jasmine.createSpy('MockUser');
            MockRound = jasmine.createSpy('MockRound');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Score': MockScore,
                'User': MockUser,
                'Round': MockRound
            };
            createController = function() {
                $injector.get('$controller')("ScoreDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'homegameApp:scoreUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
