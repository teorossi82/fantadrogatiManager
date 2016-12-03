(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .config(config);

    /** @ngInject */
    function config($logProvider) {
        // Enable log
        $logProvider.debugEnabled(true);
    }

})();
