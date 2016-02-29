(function () {
  'use strict';

  angular
    .module('app')
    .factory('visitFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      all: all,
      one: one,
      edit: edit,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/visits')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/visits/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.put('/visits/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/visits', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(payload, id) {
      return $http.post('/visits/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response;
      }
    }

    function fail(error) {
      $log.log('Visit Factory XHR failed: ', error.data);
    }

  }
})();