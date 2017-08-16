/* global CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .service('AsteService', AsteService);

    /** @ngInject */
    function AsteService(AppConfig,$q,$http) {
        var vm = this; 
        vm.getAste = function (id) {
            var deferred = $q.defer();
            var promise = $http({
                cache: false,
                url: AppConfig.server + "/aste", 
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
        };
    }
})();