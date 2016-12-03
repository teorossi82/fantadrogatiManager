/* global $, _, CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .controller('OffertaController', OffertaController);

    /** @ngInject */
    function OffertaController($log,$scope,TeamsService) {
        var vm = this;
        var render = function(){
            getPlAvail(vm.offertaOpts.role,vm.offertaOpts.fascia);
        };
        var players = TeamsService.getPlayers();
        var plAvail;
        vm.teams = TeamsService.getTeams();

        vm.offertaOpts = {
            "role":"P",
            "fascia":"1"
        };

        var getPlAvail = function(r,f){
            plAvail = _.filter(players,function(pl){
                return pl.role===r && pl.fascia==f;
            });
        };

        $scope.$watch('vm.offertaOpts', function(newValue, oldValue) {
            getPlAvail(newValue.role,newValue.fascia);
        },true);

        vm.querySearch = function(query){
            var results = query ? plAvail.filter( createFilterFor(query) ) : plAvail;
            return results;
        };

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(player) {
                return (player.name.toLowerCase().indexOf(lowercaseQuery) === 0);
            };

        };

        render();

        $scope.$on("destroy",function(){
        });
    }
})();
