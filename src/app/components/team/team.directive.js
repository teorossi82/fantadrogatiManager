/* global $, _, CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .directive("team",function (){
            return {
                restrict:'E',
                scope: {
                    teamId:'='
                },
                templateUrl:'app/components/team/team.html',
                controller:TeamController,
                controllerAs: 'vm'
            };
        });

    /** @ngInject */
    function TeamController($log,$scope,localStorageService,NgTableParams,TeamsService) {
        var vm = this;
        var render = function(){
        };
        var teams = localStorageService.get("teams");
        vm.team = TeamsService.getTeam($scope.teamId);
        var tableOpts = {
            count: 50
        };
        vm.tablePlayers = new NgTableParams(tableOpts, { dataset: vm.team.rosa});

        vm.removePlayer = function(p,t){
            TeamsService.removePlayer(p,t);
            vm.tablePlayers.reload();
        };

        vm.getTotalCost = function(t){
            var costs = 0;
            _.forEach(vm.team.rosa,function(value){
                costs+=value.costo;
            });
            return costs;
        };

        vm.saveTeams = function(){
            TeamsService.saveTeams(teams);
            //localStorageService.set("teams",teams);
        };

        render();

        $scope.$on("destroy",function(){
        });
    }
})();
