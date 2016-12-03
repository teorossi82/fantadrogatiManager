(function() {
    'use strict';

    angular
        .module('fantadrogatiManager')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($state) {
        var render = function(){
            $state.go("main.teams");
        };
        render();
    }
})();
