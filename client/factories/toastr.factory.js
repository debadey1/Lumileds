(function () {
  'use strict';

  angular
    .module('app')
    .factory('toastrFactory', factory);

  factory.$inject = [];

  function factory() {
    var factory = {
      success: success,
      error: error
    };

    return factory;

    function success(text) {
      toastr.success(null, text);
    }

    function error(text) {
      toastr.error(null, text);
    }
  }
})();