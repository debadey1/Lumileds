(function () {
  'use strict';

  angular
    .module('app')
    .factory('restaurantFactory', factory);

  factory.$inject = [
    "$http"
  ];

  function factory($http) {
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
      alert('Restaurant Factory XHR failed: ' + error.data);
    }

  }
})();