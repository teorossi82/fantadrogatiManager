/* global $, _, CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .controller('ListController', ListController);

    /** @ngInject */
    function ListController($log,$window,$scope,NgTableParams,TeamsService,listFactory,localStorageService,hashString) {
        var vm = this;
        var render = function(){
            //getPlayers();
            initlist();
            //syncQuot();
            //getPlayersQuote();
        };

        var players;
        var initlist = function(){
            players = TeamsService.getPlayers();
            var tableOpts = {
                count: 50
            };
            vm.tableParams = new NgTableParams(tableOpts, { dataset: players});
        }

        var checkParseInt = function(value){
            var val = _.isNaN(parseInt(value)) ? value : parseInt(value);
            return val;
        }
        var checkParseFloat = function(value){
            var val = _.isNaN(parseFloat(value)) ? value : parseFloat(value);
            return val;
        }

        vm.updatePlayers = function(){
            listFactory.getPlayers()
            .then(function(data){
                var table = $(data).find(".playerStats")[0];
                var pls = $(table).find("tr");
                _.forEach(pls,function(value,key){
                    try{
                        var name = $(value).find(".field-giocatore a").html();
                        var id = hashString(name);
                        if(id<0)
                            id=-id;
                        var player = _.find(players,{"id":id});
                        if(player){
                            player.pg = checkParseInt($(value).find(".field-pg").html());
                            player.mv = checkParseFloat($(value).find(".field-mv").html());
                            player.mm = checkParseFloat($(value).find(".field-mm").html());
                            player.g = checkParseInt($(value).find(".field-g").html());
                            player.a = checkParseInt($(value).find(".field-a").html());
                            player.am = checkParseInt($(value).find(".field-am").html());
                            player.es = checkParseInt($(value).find(".field-es").html());
                            player.fteam="";
                        }
                    }
                    catch(err){}
                });
                TeamsService.setPlayers(players);
                initlist();
            });
        };

        var createPlayer = function(value){
            var pl = {};
            pl.name = $(value).find(".field-giocatore a").html();
            pl.id=hashString(pl.name);
            if(pl.id<0)
                pl.id=-pl.id;
            pl.role = $(value).find(".field-ruolo").html();
            if(pl.role==="T (C)")
                pl.role="C";
            if(pl.role==="T (A)")
                pl.role="A";
            pl.team = $(value).find(".field-sqd .hidden-team-name").html();
            pl.costo = parseInt($(value).find(".field-q").html());
            pl.pg = checkParseInt($(value).find(".field-pg").html());
            pl.mv = checkParseFloat($(value).find(".field-mv").html());
            pl.mm = checkParseFloat($(value).find(".field-mm").html());
            pl.g = checkParseInt($(value).find(".field-g").html());
            pl.a = checkParseInt($(value).find(".field-a").html());
            pl.am = checkParseInt($(value).find(".field-am").html());
            pl.es = checkParseInt($(value).find(".field-es").html());
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
            return pl;
        };

        var getPlayers = function(){
            var players = [];
            listFactory.getPlayers()
            .then(function(data){
                var table = $(data).find(".playerStats")[0];
                var pls = $(table).find("tr");
                _.forEach(pls,function(value,key){
                    try{
                        var pl = createPlayer(value);
                        players.push(pl);
                    }
                    catch(err){}
                });
                TeamsService.setPlayers(players);
                initlist();
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
        };

        var getPlayersQuote = function(){
            listFactory.getQuote()
            .then(function(data){
                var table = $(data).find(".Border.None")[0];
                var pls = $(table).find("tr");
                _.forEach(pls,function(value,key){
                    try{
                        var pl = createPlayerFromQuote(value);
                        players.push(pl);
                    }
                    catch(err){}
                });
                var data = angular.toJson(players);
                //console.log(data)
            })
            .catch(function(err){
                $log.err(err);
            })
        };

        var createPlayerFromQuote = function(value){
            var pl = {};
            pl.name = $(value).find("td")[0].innerHTML;
            pl.id=hashString(pl.name);
            console.log(pl.id)
            return;
            pl.role = $(value).find(".field-ruolo").html();
            if(pl.role==="T (C)")
                pl.role="C";
            if(pl.role==="T (A)")
                pl.role="A";
            pl.team = $(value).find(".field-sqd .hidden-team-name").html();
            pl.costo = parseInt($(value).find(".field-q").html());
            pl.pg = parseInt($(value).find(".field-pg").html());
            pl.g = parseInt($(value).find(".field-g").html());
            pl.a = parseInt($(value).find(".field-a").html());
            pl.am = parseInt($(value).find(".field-am").html());
            pl.es = parseInt($(value).find(".field-es").html());
            pl.mv = parseFloat($(value).find(".field-mv").html());
            pl.mm = parseFloat($(value).find(".field-mm").html());
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
            return pl;
        };

        vm.savePlayers = function(){
            localStorageService.set("players",players);
        };
        
        render();

        $scope.$on("destroy",function(){
        });
    }
})();
