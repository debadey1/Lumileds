(function () {
  'use strict';

  angular
    .module('app')
    .factory('customerFactory', factory);

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
      return $http.get('/customers');
    }

    function one(id) {
      return $http.get('/customers/' + id);
    }

    function edit(payload, id) {
      return $http.put('/customers/' + id, payload);
    }

    function add(payload) {
      return $http.post('/customers', payload);
    }

    function remove(id) {
      return $http.post('/customers/' + id);
    }
  }
})();