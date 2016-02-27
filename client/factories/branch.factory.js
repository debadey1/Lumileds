(function () {
  'use strict';

  angular
    .module('app')
    .factory('branchFactory', factory);

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
      return $http.get('/branches')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/branches/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/branches/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/branches', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/branches/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Branch Factory XHR failed: ', error.data);
    }

  }
})();