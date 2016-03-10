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
      return $http.get('/airports');
    }

    function one(id) {
      return $http.get('/airports/' + id);
    }

    function edit(payload, id) {
      return $http.post('/airports/' + id, payload);
    }

    function add(payload) {
      return $http.post('/airports', payload);
    }

    function remove(data) {
      return $http.delete('/airports/' + data._id);
    }
  }
})();