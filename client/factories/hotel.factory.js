(function () {
  'use strict';

  angular
    .module('app')
    .factory('hotelFactory', factory);

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
      return $http.get('/hotels');
    }

    function one(id) {
      return $http.get('/hotels/' + id);
    }

    function edit(payload, id) {
      return $http.post('/hotels/' + id, payload);
    }

    function add(payload) {
      return $http.post('/hotels', payload);
    }

    function remove(data) {
      return $http.delete('/hotels/' + data._id);
    }
  }
})();