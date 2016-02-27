(function () {
  'use strict';

  angular
    .module('app')
    .factory('airportFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/airports')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/airports/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/airports/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

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
      $log.log('Airport Factory XHR failed: ', error.data);
    }

  }
})();