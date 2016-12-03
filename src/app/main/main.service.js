/* global CONFIG */
(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .service('MainService', MainService);

    /** @ngInject */
    function MainService($resource,$window) {
        var vm = this; 
    }
})();