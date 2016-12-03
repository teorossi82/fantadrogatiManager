(function() {
  'use strict';

  angular
    .module('fantadrogatiManager')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
