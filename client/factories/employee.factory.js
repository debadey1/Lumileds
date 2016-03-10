(function () {
  'use strict';

  angular
    .module('app')
    .factory('employeeFactory', factory);

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
      return $http.get('/employees');
    }

    function one(id) {
      return $http.get('/employees/' + id);
    }

    function edit(payload, id) {
      return $http.put('/employees/' + id, payload);
    }

    function add(payload) {
      return $http.post('/employees', payload);
    }

    function remove(id) {
      return $http.post('/employees/' + id);
    }
  }
})();