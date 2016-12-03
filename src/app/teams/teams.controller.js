/* global $, _, CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .controller('TeamsController', TeamsController);

    /** @ngInject */
    function TeamsController($log,$scope,teamsFactory,TeamsService,ListConfig,localStorageService,$mdDialog) {
        var vm = this;
        var render = function(){
        };
        vm.players = TeamsService.getPlayers();
        vm.teams = TeamsService.getTeams();
        vm.searchPlayer = {};

        vm.removePlayer = function(p,t){
            TeamsService.removePlayer(p,t);
        };

        vm.addPlayer = function(p,t,m){
            TeamsService.addPlayer(p,t);
            vm.searchPlayer[t].name=""
        };

        vm.clearTeam = function(t){
            TeamsService.clearTeam(t);
        };

        vm.getTotalCost = function(t){
            var team = _.find(vm.teams,{"id":t});
            if(!team)
                return console.log("no team found");
            var costs = 0;
            _.forEach(team.rosa,function(value){
                costs+=value.costo;
            });
            return costs;
        };

        vm.saveTeams = function(){
            TeamsService.saveTeams(vm.teams);
            //localStorageService.set("teams",vm.teams);
        };

        vm.saveTeam = function(team){
            var id_utente = team.id;
            var rosa = team.rosa;
            TeamsService.saveTeam(id_utente,rosa);
            //localStorageService.set("teams",vm.teams);
        };

        vm.showTeam = function(ev,t) {
            var team = _.find(vm.teams,{"id":t});
            if(!team)
                return console.log("no team found");
            $mdDialog.show({
              controller: function($scope){
                $scope.team = team;
                console.log("team dialog");
              },
              template: '<md-dialog class="fm-dialog-custom" aria-label="{{team.name}}"><form ng-cloak><team team-id="team.id"></team></form></md-dialog>',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
            })
            .then(function(answer) {
              $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
        };

        render();

        $scope.$on("destroy",function(){
        });
    }
})();
