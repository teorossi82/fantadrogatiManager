/* global $, _, CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .controller('AsteController', AsteController);

    /** @ngInject */
    function AsteController($log,$scope,AsteService,TeamsService,AsteConfig) {
        var vm = this;
        var render = function(){
            vm.state="list";
            getAste();
        };
        vm.aste;
        vm.teams = TeamsService.getTeams();
        var getAste = function(){
            AsteService.getAste()
            .then(function(data){
                vm.aste=data;
            })
            .catch(function(err){
                console.log(err);
            })
        };
        vm.openAsta = function(id){
            vm.astaAttiva = _.find(vm.aste,{"_id":id});
            vm.state="details";
        }
        render();
    }
})();
