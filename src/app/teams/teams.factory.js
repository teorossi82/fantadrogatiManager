(function(){
    'use strict';
    angular.module("fantadrogatiManager")    
    .factory('teamsFactory', function ($q,$http,AppConfig) {
        return {
            getTeams: function (anno,fase) {
                var deferred = $q.defer();
                var promise = $http({
                    cache: false,
                    url: AppConfig.server + "/teams/"+anno+"/"+fase, 
                    method: "GET",
                    headers:{}
                });
                promise.then(
                    function(data){
                        deferred.resolve(data.data); 
                    }
                )
                .catch(
                    function(err){
                        deferred.reject(err);
                    }
                );
                return deferred.promise;
            },
        	saveTeams: function (teams) {
                var deferred = $q.defer();
                var promise = $http({
                    cache: false,
                    url: AppConfig.server + "/rose", 
                    method: "POST",
                    headers:{},
                    data:teams
                });
                promise.then(
                    function(data){
                        deferred.resolve(data.data); 
                    }
                )
                .catch(
                    function(err){
                        deferred.reject(err);
                    }
                );
                return deferred.promise;
            },
            saveTeam: function (id_utente,team) {
                var deferred = $q.defer();
                var promise = $http({
                    cache: false,
                    url: AppConfig.server + "/rosa/" + id_utente, 
                    method: "POST",
                    headers:{},
                    data:team
                });
                promise.then(
                    function(data){
                        deferred.resolve(data.data); 
                    }
                )
                .catch(
                    function(err){
                        deferred.reject(err);
                    }
                );
                return deferred.promise;
            }
        };
    });
})();