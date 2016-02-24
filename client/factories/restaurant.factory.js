(function () {
  'use strict';

  angular
    .module('app')
    .factory('restaurantFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function add(payload) {
      return $http.post('/restaurants', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/restaurants/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Restaurant Factory XHR failed: ', error.data);
    }

  }
})();