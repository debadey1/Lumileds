(function () {
  'use strict';

  angular
    .module('app')
    .factory('restaurantFactory', factory);

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
      return $http.get('/restaurants');
    }

    function one(id) {
      return $http.get('/restaurants/' + id);
    }

    function edit(payload, id) {
      return $http.post('/restaurants/' + id, payload);
    }

    function add(payload) {
      return $http.post('/restaurants', payload);
    }

    function remove(data) {
      return $http.delete('/restaurants/' + data._id);
    }
  }
})();