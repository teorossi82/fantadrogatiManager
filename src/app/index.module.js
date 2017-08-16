(function() {
  'use strict';

  angular
    .module('fantadrogatiManager', [
      'ngAnimate',  
      'ngSanitize', 
      'ngMessages', 
      'ngAria', 
      'ngResource',
      'ui.router',
      'utilsMdl',
      'ngMaterial',
      'ngTable',
      'LocalStorageModule',
      'btford.socket-io'
  ])
  .factory('mySocket', function (socketFactory) {
      return socketFactory({
          ioSocket: io.connect('http://localhost:8000')
      });
  });

})();
