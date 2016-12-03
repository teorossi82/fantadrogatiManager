/* global $, _, CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .controller('ListController', ListController);

    /** @ngInject */
    function ListController($log,$window,$scope,NgTableParams,TeamsService,listFactory,localStorageService) {
        var vm = this;
        var render = function(){
            //getPlayers();
            //syncQuot()
        };

        var players = TeamsService.getPlayers();
        //var players = [];
        var tableOpts = {
            count: 50
        };
        vm.tableParams = new NgTableParams(tableOpts, { dataset: players});

        var getPlayers = function(){
            listFactory.getPlayers()
            .then(function(data){
                var table = $(data).find(".playerStats")[0];
                var pls = $(table).find("tr");
                _.forEach(pls,function(value,key){
                    try{
                        var pl = {};
                        pl.id=key;
                        pl.role = $(value).find(".field-ruolo").html();
                        if(pl.role==="T (C)")
                            pl.role="C";
                        if(pl.role==="T (A)")
                            pl.role="A";
                        pl.name = $(value).find(".field-giocatore a").html();
                        pl.team = $(value).find(".field-sqd .hidden-team-name").html();
                        pl.costo = parseInt($(value).find(".field-q").html());
                        pl.pg = parseInt($(value).find(".field-pg").html());
                        pl.g = parseInt($(value).find(".field-g").html());
                        pl.a = parseInt($(value).find(".field-a").html());
                        pl.am = parseInt($(value).find(".field-am").html());
                        pl.es = parseInt($(value).find(".field-es").html());
                        pl.mv = parseInt($(value).find(".field-mv").html());
                        pl.mm = parseInt($(value).find(".field-mm").html());
                        if(pl.role==="P")
                            pl.fascia=1;
                        if(pl.role==="D"){
                            if(pl.costo<=5)
                                pl.fascia=3;
                            else if(pl.costo<=8)
                                pl.fascia=2;
                            else
                                pl.fascia=1; 
                        }
                        if(pl.role==="C"){
                            if(pl.costo<=8)
                                pl.fascia=3;
                            else if(pl.costo<=13)
                                pl.fascia=2;
                            else
                                pl.fascia=1; 
                        }
                        if(pl.role==="A"){
                            if(pl.costo<=9)
                                pl.fascia=3;
                            else if(pl.costo<=16)
                                pl.fascia=2;
                            else
                                pl.fascia=1; 
                        }
                        players.push(pl);
                    }
                    catch(err){}
                });
                var data = angular.toJson(players);
                console.log(data)
            })
            .catch(function(err){
                $log.err(err);
            })
        };

        var syncQuot = function(){
            var d = _.filter(players,{"role":"A"});
            _.forEach(d,function(value){
                var dd = _.find(at,function(n){
                    if(value.name.toLowerCase().indexOf(n.name.replace(/\s*\(.*?\)\s*/g, '').toLowerCase()) !== -1){
                        value.costo = parseInt(n.costo);
                        if(value.costo<=9)
                            value.fascia=3;
                        else if(value.costo<=16)
                            value.fascia=2;
                        else
                            value.fascia=1; 
                        return true;
                    }
                });
                if(!dd)
                    console.log(value.name);
            });
        }

        vm.savePlayers = function(){
            localStorageService.set("players",players);
        };
        
        render();

        $scope.$on("destroy",function(){
        });
    }
})();
