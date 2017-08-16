(function(){
    'use strict';
    angular.module("fantadrogatiManager")    
    .factory('listFactory', function ($q,AppConfig,$http) {
        return {
            getData: function (type) {
                var deferred = $q.defer();
                var promise = $http({
                    cache: false,
                    url: AppConfig.server + "/data/"+type, 
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
            getPlayers: function () {
                var deferred = $q.defer();
                var promise = $http({
                    cache: false,
                    "url":"http://www.gazzetta.it/calcio/fantanews/statistiche/serie-a-2016-17/",
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
            getQuote: function () {
                var deferred = $q.defer();
                var promise = $http({
                    cache: false,
                    url: "http://www.fantagiaveno.it/quotazioni-calciatori.asp", 
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
            }
        };
    });
})();