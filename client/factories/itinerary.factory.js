(function () {
  'use strict';

  angular
    .module('app')
    .factory('itineraryFactory', factory);

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
      return $http.get('/itineraries')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/itineraries/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.put('/itineraries/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/itineraries', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(payload, id) {
      return $http.post('/itineraries/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Itinerary Factory XHR failed: ', error.data);
    }

  }
})();