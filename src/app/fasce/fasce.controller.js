/* global $, _, CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .controller('FasceController', FasceController);

    /** @ngInject */
    function FasceController($log,$scope,TeamsService,$location,$anchorScroll) {
        var vm = this;
        var render = function(){
        };

        var players=TeamsService.getPlayers();

        var getFasciaPlayers = function(r,f){
            var pls = _.filter(players,{"role":r,"fascia":f});
            var ord = r==='P' ? "team" : "costo";
            var dir = r==='P' ? "asc" : "desc";
            pls = _.orderBy(pls,ord,dir);
            return pls;
        };

        vm.fasce = {
            "P":[
                {
                    "id":1,
                    "player":getFasciaPlayers("P",1)
                }
            ],
            "D":[
                {
                    "id":1,
                    "player":getFasciaPlayers("D",1)
                },
                {
                    "id":2,
                    "player":getFasciaPlayers("D",2)
                },
                {
                    "id":3,
                    "player":getFasciaPlayers("D",3)
                }
            ],
            "C":[
                {
                    "id":1,
                    "player":getFasciaPlayers("C",1)
                },
                {
                    "id":2,
                    "player":getFasciaPlayers("C",2)
                },
                {
                    "id":3,
                    "player":getFasciaPlayers("C",3)
                }
            ],
            "A":[
                {
                    "id":1,
                    "player":getFasciaPlayers("A",1)
                },
                {
                    "id":2,
                    "player":getFasciaPlayers("A",2)
                },
                {
                    "id":3,
                    "player":getFasciaPlayers("A",3)
                }
            ]
        };

        vm.fasciaActive = {
            role:"P",
            fascia:1
        };

        vm.setFascia = function(r,f){
            vm.fasciaActive.role=r;
            vm.fasciaActive.fascia=f;
            var newHash = 'fascia-' + r + f;
            if ($location.hash() !== newHash) {
                // set the $location.hash to `newHash` and
                // $anchorScroll will automatically scroll to it
                $location.hash('fascia-' + r + f);
            } else {
                // call $anchorScroll() explicitly,
                // since $location.hash hasn't changed
                $anchorScroll();
            }
        };

        vm.getFasciaPlayers = function(r,f){
            return getFasciaPlayers(r,f);
        };

        // vm.chunkedData = function(r,f){
        //     var fascia = _.find(vm.fasce[r],{"id":f});
        //     function columnize(input, cols) {
        //       var arr = [];
        //       for(i = 0; i < input.length; i++) {
        //         var colIdx = i % cols;
        //         arr[colIdx] = arr[colIdx] || [];
        //         arr[colIdx].push(input[i]);
        //       }
        //       return arr;
        //     }
        //     return columnize(fascia.player, 3)
        // };

        render();

        $scope.$on("destroy",function(){
        });
    }
})();
