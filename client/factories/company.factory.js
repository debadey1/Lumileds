(function () {
  'use strict';

  angular
    .module('app')
    .factory('companyFactory', factory);

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
      return $http.get('/companies');
    }

    function one(id) {
      return $http.get('/companies/' + id);
    }

    function edit(payload, id) {
      return $http.post('/companies/' + id, payload);
    }

    function add(payload) {
      return $http.post('/companies', payload);
    }

    function remove(data) {
      return $http.delete('/companies/' + data._id);
    }
  }
})();