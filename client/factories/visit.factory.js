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
      remove: remove,
      execVisits: execVisits
    };

    return factory;
    //////////

    function all() {
      return $http.get('/visits');
    }

    function one(id) {
      return $http.get('/visits/' + id);
    }

    function edit(payload, id) {
      return $http.put('/visits/' + id, payload);
    }

    function add(payload) {
      return $http.post('/visits', payload);
    }

    function remove(payload, id) {
      return $http.post('/visits/' + id, payload);
    }

    function execVisits(payload) {
      return $http.post('/visits/exec-visits', payload);
    }
  }
})();