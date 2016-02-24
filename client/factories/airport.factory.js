(function () {
  'use strict';

  angular
    .module('app')
    .factory('airportFactory', factory);

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
      return $http.post('/airports', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/airports/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      alert('Airport Factory XHR failed: ' + error.data);
    }

  }
})();