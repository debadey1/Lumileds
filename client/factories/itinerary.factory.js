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
      changeRegion: changeRegion,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/itineraries');
    }

    function one(id) {
      return $http.get('/itineraries/' + id);
    }

    function edit(payload, id) {
      return $http.put('/itineraries/' + id, payload);
    }

    function add(payload) {
      return $http.post('/itineraries', payload);
    }

    function remove(payload, id) {
      return $http.post('/itineraries/' + id, payload);
    }

    function changeRegion(payload, id) {
      return $http.put('/itineraries/region/' + id, payload);
    }
  }
})();