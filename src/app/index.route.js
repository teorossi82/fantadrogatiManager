/* global MIBAC_VIEWER_CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main', {
            url: '/main',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        })
            .state('main.list', {
            url: '/list',
            templateUrl: 'app/list/list.html',
            controller: 'ListController',
            controllerAs: 'vm',
            resolve: {
            }
        })
            .state('main.teams', {
            url: '/teams',
            templateUrl: 'app/teams/teams.html',
            controller: 'TeamsController',
            controllerAs: 'vm',
            resolve: {
            }
        })
            .state('main.fasce', {
            url: '/fasce',
            templateUrl: 'app/fasce/fasce.html',
            controller: 'FasceController',
            controllerAs: 'vm',
            resolve: {
            }
        })
            .state('main.offerta', {
            url: '/offerta',
            templateUrl: 'app/offerta/offerta.html',
            controller: 'OffertaController',
            controllerAs: 'vm',
            resolve: {
            }
        });

        $urlRouterProvider.otherwise('/main');
    }

})();
