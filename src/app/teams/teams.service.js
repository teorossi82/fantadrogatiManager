/* global CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .service('TeamsService', TeamsService);

    /** @ngInject */
    function TeamsService(TeamsConfig,$log,$q,AppConfig,$http,localStorageService,ListConfig,teamsFactory) {
        var vm = this; 

        var _players = localStorageService.get("players") ? JSON.parse(localStorageService.get("players")) : ListConfig.players;

        vm.getPlayers = function(){
        	return _players;
        };

        vm.setPlayers = function(pls){
            _players = pls;
            localStorageService.set("players",angular.toJson(_players));
        };

        //var _teams = localStorageService.get("teams") || TeamsConfig.teams;
        // _.forEach(_teams,function(team){
        //     team.rosa = [];
        // })

        var _teams;

        var initPlayers = function(teams){
            _.forEach(teams,function(team){
                _.forEach(team.rosa,function(p,i){
                    var plPurchased = _.find(_players, {"name":p.name});
                    if(plPurchased){
                        plPurchased.costo=p.costo;
                        plPurchased.fteam=team.name;
                        team.rosa.splice(i,1,plPurchased);
                    }
                })
            });
        };

        vm.getTeamsFromServer = function(anno,fase){
        	var deferred = $q.defer();
            var promise = $http({
                cache: false,
                url: AppConfig.server + "/teams/"+anno+"/"+fase, 
                method: "GET",
                headers:{}
            });
            promise.then(
                function(data){
                    _teams = data.data;
                    initPlayers(_teams);
                    deferred.resolve(_teams); 
                }
            )
            .catch(
                function(err){
                    deferred.reject(err);
                }
            );
            return deferred.promise;
        };

        vm.getTeams = function(){
            return _teams;
        };

        vm.getTeam = function(t){
        	var team = _.find(_teams,{"id":t});
            if(!team)
                return null;
            return team;
        };

        vm.addPlayer = function(p,t){
        	var team = _.find(_teams,{"id":t});
            if(!team)
                return console.log("no team found");
            team.rosa = team.rosa || [];
            team.rosa.unshift(p);
            p.fteam = team.name;
            vm.saveTeam(t,team.rosa);
            //localStorageService.set("teams",_teams);
        };

        vm.removePlayer = function(p,t){
            var team = _.find(_teams,{"id":t});
            if(!team)
                return console.log("no team found");
            var plToDelete = _.remove(team.rosa, function(n) {
                return n.id === p.id;
            });
            if(plToDelete)
            	plToDelete[0].fteam="";
            vm.saveTeam(t,team.rosa);
            //localStorageService.set("teams",_teams);
        };

        vm.clearTeam = function(t){
            var team = _.find(_teams,{"id":t});
            if(!team)
                return null;
            _.forEach(team.rosa,function(value){
                value.fteam="";
            });
            team.rosa = [];
            localStorageService.set("teams",_teams);
        };

        vm.saveTeams = function(teams){
            var t = _.clone(teams) || _.clone(_teams);
            var rose = [];
            _.forEach(t,function(team){
                var rosa = {
                    "id_utente":team.id,
                    "rosa":team.rosa,
                    "anno":2017,
                    "numero":1
                };
                rose.push(rosa);
            });
            var req = teamsFactory.saveTeams(rose);
            req.then(function(data){
                console.log(data);
            })
            .catch(function(err){
                $log.error(err);
            });
        };

        vm.saveTeam = function(id_utente,rosa){
            var r = {};
            r.anno = 2017;
            r.numero = 1;
            r.rosa = rosa;
            r.id_utente = id_utente;
            var req = teamsFactory.saveTeam(id_utente,r);
            req.then(function(data){
                console.log(data);
            })
            .catch(function(err){
                $log.error(err);
            });
        };
    }
})();