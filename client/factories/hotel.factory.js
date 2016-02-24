(function () {
  'use strict';

  angular
    .module('app')
    .factory('hotelFactory', factory);

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
      return $http.post('/hotels', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/hotels/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      alert('Hotel Factory XHR failed: ' + error.data);
    }

  }
})();